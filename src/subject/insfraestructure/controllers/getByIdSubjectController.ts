import { Request, Response } from "express";
import { GetByIdSubjectUseCase } from "../../application/getByIdSubjectUseCase";

export class GetByIdSubjectController {
    constructor(readonly getByIdSubjectUseCase: GetByIdSubjectUseCase) { }

    async execute(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);

        try {
            const Subject = await this.getByIdSubjectUseCase.execute(id);

            if (Subject) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        new_Subject: Subject,
                        message: "asignatura recuperada"
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while recovery Subject."
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
                message: "An error occurred while fetching the Subject."
            });
        }
    }
}