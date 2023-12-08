import { Request, Response } from "express";
import { GetCareersByInstitutionUseCase } from "../../application/getCareersByInstitutionUseCase";

export class GetCareerByInstitutionController {
    constructor(readonly getCareersUseCase: GetCareersByInstitutionUseCase) { }

    async execute(req: Request, res: Response) {
        const institution_id = parseInt(req.params.institution_id, 10);

        try {
            const listCareers = await this.getCareersUseCase.execute(institution_id);

            // Responde con las carreras obtenidas
            if (listCareers) {
                return res.status(200).send({
                    status: "success",
                    data: listCareers,
                    message: "Carreras obtenidas correctamente",
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while recovery carreers in Institution."
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