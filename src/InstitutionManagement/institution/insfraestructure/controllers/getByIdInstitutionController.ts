import { Request, Response } from "express";
import { GetByIdInstitutionUseCase } from "../../application/getByIdInstitutionUseCase";

export class GetByIdInstitutionController {
    constructor(readonly getByIdInstitutionUseCase: GetByIdInstitutionUseCase) { }

    async execute(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);

        try {
            const institution = await this.getByIdInstitutionUseCase.execute(id);

            if (institution) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        new_Institution: institution,
                        message: "Institución recuperada"
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while recovery Institution."
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