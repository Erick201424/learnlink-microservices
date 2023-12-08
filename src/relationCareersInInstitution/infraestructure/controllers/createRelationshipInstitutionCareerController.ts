import { Request, Response } from "express";
import { CreateInstitutionCareerRelationshipUseCase } from "../../application/createRelationshipInstitutionCareerUseCase";

export class CreateInstitutionCareerRelationshipController {
    constructor(readonly createRelationUseCase: CreateInstitutionCareerRelationshipUseCase) { }

    async execute(req: Request, res: Response) {
        const { institution_id, career_id } = req.body;

        try {
            const createdRelationship = await this.createRelationUseCase.execute(institution_id, career_id);

            if (createdRelationship) {
                return res.status(201).send({
                    status: "success",
                    message: "La relación entre institución y carrera ha sido creada con éxito",
                });
            } else {
                return res.status(400).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al crear la relación entre institución y carrera, intentelo más tarde",
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