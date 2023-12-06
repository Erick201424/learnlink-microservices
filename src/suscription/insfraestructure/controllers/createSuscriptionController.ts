import { Request, Response } from "express";
import { CreateSuscriptionUseCase } from "../../application/createSuscriptionUseCase";

export class CreateSuscriptionController {
    constructor(readonly createSuscriptionUseCase: CreateSuscriptionUseCase) { }

    async execute(req: Request, res: Response) {
        const { id_event } = req.body;
        const { id_user } = req.body;



        try {
            const createSuscription = await this.createSuscriptionUseCase.execute(id_event,id_user);

            if (createSuscription) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        id_event: createSuscription.id_event,
                        id_user:createSuscription.id_user,

                    },
                    message: "El Suscription ha sigo agregado a la base de datos",

                });
            } else {
                return res.status(400).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al registrar Suscription, intentelo mas tarde"
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
                message: "An error occurred while adding the Suscription."
            });
        }
    }
}