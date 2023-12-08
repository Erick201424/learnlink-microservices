import { Request, Response } from "express";
import { UpdateInstitutionUseCase } from "../../application/updateInstitutionUseCase";

export class UpdateInstitutionController {
    constructor(readonly updateInstitutionUseCase: UpdateInstitutionUseCase) { }

    async execute(req: Request, res: Response) {
        const { id } = req.params;
        const { name, educationLevel, term } = req.body;

        try {
            const updateInstitution = await this.updateInstitutionUseCase.execute(Number(id), name, educationLevel, term);

            if (updateInstitution) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        id: updateInstitution.id,
                        name: updateInstitution.name,
                        educationLevel: updateInstitution.educationLevel,
                        term: updateInstitution.term,
                    },
                    message: "La Institución ha sigo actualizada en la base de datos",
                });
            } else {
                res.status(400).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al actualizar la institución",
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