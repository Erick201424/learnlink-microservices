import { Request, Response } from "express";
import { CreateCommunityUseCase } from "../../application/createCommunityUseCase";

export class CreateCommunityController {
    constructor(readonly createCommunityUseCase: CreateCommunityUseCase) { }

    async execute(req: Request, res: Response) {
        const { type } = req.body;
        const { name } = req.body;
        const { description } = req.body;
        const { iduser } = req.body;


        try {
            const createCommunity = await this.createCommunityUseCase.execute(type,name,description,iduser);

            if (createCommunity) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        type: createCommunity.type,
                        name:createCommunity.name,
                        description:createCommunity.description,
                        iduser:createCommunity.iduser

                    },
                    message: "La comunidad ha sigo agregada a la base de datos",

                });
            } else {
                return res.status(400).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al registrar comunidad, intentelo mas tarde"
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
                message: "An error occurred while adding the Community."
            });
        }
    }
}