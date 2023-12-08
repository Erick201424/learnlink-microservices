import { Request, Response } from "express";
import { UpdateInstitutionCareerRelationshipUseCase } from "../../application/updateRelationshipInstitutionCareerUseCase";

export class UpdateInstitutionCareerRelationshipController {
    constructor(readonly updateteRelationUseCase: UpdateInstitutionCareerRelationshipUseCase) { }

    async execute(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);
        const { institution_id, career_id } = req.body;

        try {
            const updatedRelationship = await this.updateteRelationUseCase.execute(id, institution_id, career_id);

            if (updatedRelationship) {
                return res.status(201).send({
                    status: "success",
                    message: "La relación entre institución y carrera ha sido actualizada con éxito",
                });
            } else {
                return res.status(400).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al actualizar la relación entre institución y carrera, intentelo más tarde",
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
                message: "Error interno del servidor"
            });

        }
    }
}
