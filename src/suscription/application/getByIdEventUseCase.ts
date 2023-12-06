import { Suscription, SuscriptionWithUsers } from "../domain/entities/suscription";
import { SuscriptionRepository } from "../domain/repositories/suscriptionRepository";
import { ValidatorGetByIdEvent } from "../domain/validations/suscriptionValidation";
import { validate } from "class-validator";
import axios, { AxiosResponse } from "axios";

export class GetByIdEventUseCase {
    constructor(readonly suscriptionRepository: SuscriptionRepository) { }

    async execute(id: number): Promise<SuscriptionWithUsers[] | any | null> {
        const suscriptionId = new ValidatorGetByIdEvent(id);
        const suscriptionValidation = await validate(suscriptionId);

        if (suscriptionValidation.length > 0) {
            throw new Error(JSON.stringify(suscriptionId));
        }

        try {
            const listSuscriptions = await this.suscriptionRepository.getByEventId(id);

            if (!Array.isArray(listSuscriptions) || listSuscriptions.length === 0) {
                return null;
            }

            console.log("Suscriptions:", listSuscriptions);
            console.log("Number of suscriptions:", listSuscriptions.length);

            const userIds = listSuscriptions.map((suscription: any) => suscription.user);
            console.log("UserIds:", userIds);
            const usersData: any[] = [];

            for (const userId of userIds) {
                try {
                    console.log("Usuario a recuperar: ", userId);
                    const studentData: AxiosResponse<any> = await axios.get(`http://localhost:3000/api/v1/user_services/user/${userId}`);

                    if (studentData.status) {
                        usersData.push(studentData.data);

                        // Imprimir detalles de los datos del estudiante
                        console.log(`Datos del usuario ${userId}:`, JSON.stringify(studentData.data, null, 2));
                    } else {
                        // Manejar errores de la petición al microservicio de estudiantes para un usuario específico
                        console.error(`Error al obtener datos del usuario ${userId}: ${studentData.statusText}`);
                    }
                } catch (error: any) {
                    // Imprimir detalles del error al recuperar datos del estudiante
                    console.error(`Error al hacer la petición al microservicio para el usuario ${userId}: ${error.message}`);
                }
            }

            // Agregar userData a cada suscripción
            const suscriptionsWithUsers = listSuscriptions.map((suscription: any, index: number) => ({
                ...suscription,
                userData: usersData[index]
            }));

            return suscriptionsWithUsers;

        } catch (error) {
            return null;
        }

    }
}
