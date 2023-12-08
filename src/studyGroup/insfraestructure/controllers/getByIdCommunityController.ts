import { Request, Response } from "express";
import { Community, CommunityWithStudent } from "../../domain/entities/community";
import { GetByIdCommunityUseCase } from "../../application/getByIdCommunityUseCase";
import axios from "axios";

export class GetByIdCommunityController {
    constructor(readonly getByIdCommunityUseCase: GetByIdCommunityUseCase) { }

    async execute(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);

        try {
            const Community = await this.getByIdCommunityUseCase.execute(id);

            // Verificar si getCommunity es un array y tiene al menos un elemento
            if (!Array.isArray(Community) || Community.length === 0) {
                return null;
            }

            // Obtener el id del usuario creador de la comunidad
            const userId = (Community[0] as Community).iduser; // Accede al primer elemento del array

            console.log("userID: ", userId);
            // Hacer una petición GET al microservicio de estudiantes
            const studentResponse = await axios.get(`http://localhost:3002/user/${userId}`);

            // Verificar si la petición al microservicio fue exitosa
            if (studentResponse.status) {
                const studentData = studentResponse.data;

                // Agregar la información del estudiante a los datos de la comunidad
                const communityWithStudent: CommunityWithStudent = {
                    ...Community,
                    studentData: studentData,  // Ajusta esto según la estructura de tu microservicio
                };

                console.log(communityWithStudent);

                if (communityWithStudent) {
                    return res.status(200).send({
                        status: "success",
                        data: {
                            new_Comunidad: communityWithStudent,
                            message: "asignatura recuperada"
                        }
                    });
                } else {
                    return res.status(500).send({
                        status: "error",
                        message: "An error occurred while recovery Community."
                    });
                }
            } else {
                // Manejar errores de la petición al microservicio de estudiantes
                console.error('Error al obtener datos del estudiante:', studentResponse.statusText);
            }

        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while fetching the Community."
            });
        }
    }
}