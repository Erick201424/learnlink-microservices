import { Request, Response } from "express";
import { CreateSubjectUseCase } from "../../application/createSubjectUseCase";

export class CreateSubjectController {
    constructor(readonly createSubjectUseCase: CreateSubjectUseCase) { }

    async execute(req: Request, res: Response) {
        const { name } = req.body;
        const { iduser } = req.body;


        try {
            const createSubject = await this.createSubjectUseCase.execute(name, iduser);

            if (createSubject) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        name: createSubject.name,
                    },
                    message: "La asignatura ha sigo agregada a la base de datos",

                });
            } else {
                return res.status(400).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al registrar una nueva asignatura, intentelo mas tarde"
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
                message: "An error occurred while adding the Subject."
            });
        }
    }
}