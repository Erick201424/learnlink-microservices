import { Request, Response } from "express";
import { CreateInstitutionUseCase } from "../../application/createInstitutionUseCase";

export class CreateInstitutionController {
    constructor(readonly createInstitutionUseCase: CreateInstitutionUseCase) { }

    async execute(req: Request, res: Response) {
        const { name, educationLevel, term } = req.body;

        try {
            const createInstitution = await this.createInstitutionUseCase.execute(name, educationLevel, term);

            if (createInstitution) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        name: createInstitution.name,
                        educationLevel: createInstitution.educationLevel,
                        term: createInstitution.term,
                    },
                    message: "La Institución ha sigo agregada a la base de datos",

                });
            } else {
                return res.status(400).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al crear la institución, intentelo mas tarde"
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
                message: "An error occurred while adding the institution."
            });
        }
    }
}