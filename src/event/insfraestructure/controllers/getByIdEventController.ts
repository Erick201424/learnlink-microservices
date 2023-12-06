import { Request, Response } from "express";
import { GetByIdEventUseCase } from "../../application/getByIdEventUseCase";

export class GetByIdEventController {
    constructor(readonly getByIdEventUseCase: GetByIdEventUseCase) { }

    async execute(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);

        try {
            const Event = await this.getByIdEventUseCase.execute(id);

            if (Event) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        new_Event: Event,
                        message: "asignatura recuperada"
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while recovery Event."
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
                message: "An error occurred while fetching the Event."
            });
        }
    }
}