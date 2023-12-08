import { Community, CommunityWithStudent } from "../domain/entities/community";
import { CommunityRepository } from "../domain/repositories/communityRepository";
import { ValidatorGetByIdCommunity } from "../domain/validations/communityValidation";
import { validate } from "class-validator";
import { getStudentByID } from "../insfraestructure/microservices/microservices";
import axios from "axios";

export class GetByIdCommunityUseCase {
    constructor(readonly CommunityRepository: CommunityRepository) { }

    async execute(id: number): Promise<Community | null> {
        const CommunityId = new ValidatorGetByIdCommunity(id);
        const CommunityValidation = await validate(CommunityId);

        if (CommunityValidation.length > 0) {
            throw new Error(JSON.stringify(CommunityId));
        }

        try {
            // Obtener datos de la comunidad desde el repositorio
            const getCommunity = await this.CommunityRepository.getByIdCommunity(id);

            // Verificar si getCommunity es un array y tiene al menos un elemento
            if (!Array.isArray(getCommunity) || getCommunity.length === 0) {
                return null;
            }

            // Obtener el id del usuario creador de la comunidad
            const userId = (getCommunity[0] as Community).iduser; // Accede al primer elemento del array

            console.log("userID: ", userId);
            // Hacer una petición GET al microservicio de estudiantes
            const studentResponse = await axios.get(`https://apigateway.learnlinked.net/api/v1/user_services/user/${userId}`);

            // Verificar si la petición al microservicio fue exitosa
            if (studentResponse.status) {
                const studentData = studentResponse.data;

                // Agregar la información del estudiante a los datos de la comunidad
                const communityWithStudent: CommunityWithStudent = {
                    ...getCommunity,
                    studentData: studentData,  // Ajusta esto según la estructura de tu microservicio
                };

                console.log(communityWithStudent);

                return communityWithStudent;
            } else {
                // Manejar errores de la petición al microservicio de estudiantes
                console.error('Error al obtener datos del estudiante:', studentResponse.statusText);
                return getCommunity;  // Devuelve la comunidad sin datos del estudiante en caso de error
            }
        } catch (error) {
            return null;
        }
    }
}