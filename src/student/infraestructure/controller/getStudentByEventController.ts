import { Request, Response } from "express";
import { GetStudentsByEventUseCase } from "../../application/getStudentByEventUseCase";

export class GetStudentsByEventController {
    constructor(readonly getStudentsUseCase: GetStudentsByEventUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            // Obtén los IDs de eventos desde el cuerpo de la solicitud (req.body)
            const { userIds } = req.body;

            console.log(userIds);

            // Validación: Asegúrate de que userIds es un array
            if (!Array.isArray(userIds)) {
                return res.status(400).send({
                    status: "error",
                    message: "userIds debe ser un array de IDs de usuario",
                });
            }

            // Ejecuta el caso de uso con los IDs de eventos
            const studentList = await this.getStudentsUseCase.execute(userIds);

            // Logging: Agregar un registro para indicar la finalización exitosa del controlador
            console.log("GetStudentsByEventController completed successfully.");

            // Devuelve la respuesta exitosa con la lista de estudiantes
            if (studentList) {
                return res.status(201).send({
                    status: "succes",
                    data: {
                        studentList
                    }
                })
            }
            else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while userowner"
                });
            }

        } catch (error) {
            // Logging: Agregar un registro para indicar un error en el controlador
            console.error("Error in GetStudentsByEventController:", error);

            // Devuelve una respuesta de error con información sobre el error
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred while getting users by event",
                error: error, // Puedes ajustar esto según tus necesidades
            });
        }
    }
}
