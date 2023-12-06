import { Request, Response } from "express";
import { GetStudentByIdUseCase } from "../../application/getStudentByIdUseCase";
import { StudentLogin } from "../../domain/entities/student";

export class GetStudentByIdController {
    constructor(readonly getStudentById: GetStudentByIdUseCase) { }

    async execute(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);

        try {
            const getStudentById = await this.getStudentById.execute(id);

            if (StudentLogin) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        student: getStudentById,
                        message: "Datos del estudiante recuperados"
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while recovery the Student."
                });
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
                message: "An error occurred while fetching the institution."
            });
        }
    }
}