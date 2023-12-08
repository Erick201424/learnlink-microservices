import { Request, Response } from "express";
import { GetByIdCareerUseCase } from "../../application/getByIdCareerUseCase";

export class GetByIdCareerController {
    constructor(readonly getByIdCareerUseCase: GetByIdCareerUseCase) { }

    async execute(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);

        try {
            const career = await this.getByIdCareerUseCase.execute(id);

            if (career) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        new_Career: career,
                        message: "Carrera recuperada"
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while recovery Career."
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
                message: "An error occurred while fetching the career."
            });
        }
    }
}