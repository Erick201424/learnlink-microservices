import { Request, Response } from "express";
import { UpdateSubjectUseCase } from "../../application/updateSubjectUseCase";

export class UpdateSubjectController {
    constructor(readonly updateSubjectUseCase: UpdateSubjectUseCase) { }

    async execute(req: Request, res: Response) {
        const { id } = req.params;
        const { name } = req.body;
        const { iduser } = req.body;


        try {
            const updateSubject = await this.updateSubjectUseCase.execute(Number(id), name,Number(iduser));

            if (updateSubject) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        id: updateSubject.id,
                        name: updateSubject.name,
                    },
                    message: "La asignatura ha sigo actualizada en la base de datos",
                });
            } else {
                res.status(400).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al actualizar la asignatura seleccionada",
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
                message: "An error occurred while adding the Subject."
            });

        }
    }
}