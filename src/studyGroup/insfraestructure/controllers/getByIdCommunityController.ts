import { Request, Response } from "express";
import { GetByIdCommunityUseCase } from "../../application/getByIdCommunityUseCase";

export class GetByIdCommunityController {
    constructor(readonly getByIdCommunityUseCase: GetByIdCommunityUseCase) { }

    async execute(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);

        try {
            const Community = await this.getByIdCommunityUseCase.execute(id);


            if (Community) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        new_Community: Community,
                        message: "asignatura recuperada"
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while recovery Community."
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
                message: "An error occurred while fetching the Community."
            });
        }
    }
}