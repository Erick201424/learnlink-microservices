import { Request, Response } from "express";
import { CreateCareerUseCase } from "../../application/createCareerUseCase";

export class CreateCareerController {
    constructor(readonly createCareerUseCase: CreateCareerUseCase) { }

    async execute(req: Request, res: Response) {
        const { name } = req.body;

        try {
            const createCareer = await this.createCareerUseCase.execute(name);

            if (createCareer) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        name: createCareer.name,
                    },
                    message: "La carrera ha sigo agregada a la base de datos",

                });
            } else {
                return res.status(400).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al registrar una nueva carrera, intentelo mas tarde"
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
                message: "An error occurred while adding the career."
            });
        }
    }
}