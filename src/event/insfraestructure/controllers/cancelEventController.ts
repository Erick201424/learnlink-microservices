import { Request, Response } from "express";
import { CancelEventUseCase } from "../../application/cancelEventUseCase";

export class CancelEventController {
    constructor(readonly CancelEventUseCase: CancelEventUseCase) { }

    async execute(req: Request, res: Response) {
        const { id } = req.params;
        const status = "cancelado"


        try {
            const CancelEvent = await this.CancelEventUseCase.execute(Number(id), status);

            if (CancelEvent) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        id: CancelEvent.id,
                        status: CancelEvent.status,
                    },
                    message: "El evento se ha cancelado",
                });
            } else {
                res.status(400).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al actualizar la evento seleccionado",
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
                message: "An error occurred while canceling the event."
            });

        }
    }
}