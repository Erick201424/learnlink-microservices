import { Request, Response } from "express";
import { GetByIdScheduleUseCase } from "../../application/getByIdScheduleUseCase";

export class GetByIdScheduleController {
    constructor(readonly getByIdScheduleUseCase: GetByIdScheduleUseCase) { }

    async execute(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);

        try {
            const Schedule = await this.getByIdScheduleUseCase.execute(id);

            if (Schedule) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        new_Schedule: Schedule,
                        message: "asignatura recuperada"
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while recovery Schedule."
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
                message: "An error occurred while fetching the Schedule."
            });
        }
    }
}