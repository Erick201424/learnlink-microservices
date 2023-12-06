import { Request, Response } from "express";
import { CreateScheduleUseCase } from "../../application/createScheduleUseCase";

export class CreateScheduleController {
    constructor(readonly createScheduleUseCase: CreateScheduleUseCase) { }

    async execute(req: Request, res: Response) {
        const { day } = req.body;
        const { start_at } = req.body;
        const { end_at } = req.body;
        const { idsubject } = req.body;
        const { iduser } = req.body;


        try {
            const createSchedule = await this.createScheduleUseCase.execute(day,start_at,end_at,idsubject,iduser);

            if (createSchedule) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        day: createSchedule.day,
                        start_at:createSchedule.start_at,
                        end_at:createSchedule.end_at,
                        idsubject:createSchedule.idsubject,
                        iduser:createSchedule.iduser

                    },
                    message: "La asignatura ha sigo agregada a la base de datos",

                });
            } else {
                return res.status(400).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al registrar horario, intentelo mas tarde"
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
                message: "An error occurred while adding the Schedule."
            });
        }
    }
}