import { Request, Response } from "express";
import { DeleteInstitutionUseCase } from "../../application/deleteInstitutionUseCase";

export class DeleteInstitutionController {
    constructor(readonly deleteInstitutionUseCase: DeleteInstitutionUseCase) { }

    async execute(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);

        try {
            const deleteInstitution = await this.deleteInstitutionUseCase.execute(id);

            if (deleteInstitution) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        delete_Institution: deleteInstitution
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while deleting the Institution."
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
                message: "An error occurred while deleting the Institution."
            });
        }
    }
}