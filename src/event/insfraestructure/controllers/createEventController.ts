import { Request, Response } from "express";
import { CreateEventUseCase } from "../../application/createEventUseCase";

export class CreateEventController {
    constructor(readonly createEventUseCase: CreateEventUseCase) { }

    async execute(req: Request, res: Response) {
        const { description } = req.body;
        const { id_community } = req.body;
        const { location } = req.body;
        const { date } = req.body;
        const { starts_at } = req.body;
        const status = "activo";



        try {
            const createEvent = await this.createEventUseCase.execute(description,id_community,location,date,starts_at,status);

            if (createEvent) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        description: createEvent.description,
                        id_community:createEvent.id_community,
                        location:createEvent.location,
                        date:createEvent.date,
                        starts_at:createEvent.starts_at,
                        status:createEvent.status


                    },
                    message: "El evento ha sigo agregada a la base de datos",

                });
            } else {
                return res.status(400).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al registrar evento, intentelo mas tarde"
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
                message: "An error occurred while adding the Event."
            });
        }
    }
}