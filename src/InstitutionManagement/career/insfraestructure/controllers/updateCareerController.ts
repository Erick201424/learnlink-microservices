import { Request, Response } from "express";
import { UpdateCareerUseCase } from "../../application/updateCareerUseCase";

export class UpdateCareerController {
    constructor(readonly updateCareerUseCase: UpdateCareerUseCase) { }

    async execute(req: Request, res: Response) {
        const { id } = req.params;
        const { name } = req.body;

        try {
            const updateCareer = await this.updateCareerUseCase.execute(Number(id), name);

            if (updateCareer) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        id: updateCareer.id,
                        name: updateCareer.name,
                    },
                    message: "La carrera ha sigo actualizada en la base de datos",
                });
            } else {
                res.status(400).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al actualizar la carrera seleccionada",
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
                message: "An error occurred while adding the career."
            });

        }
    }
}