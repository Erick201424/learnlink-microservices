import { Request, Response } from "express";
import { UpdateStudentUseCase } from "../../application/updateStudentUseCase";

export class UpdateStudentController {
    constructor(readonly updateStudentUseCase: UpdateStudentUseCase) { }

    async execute(req: Request, res: Response) {
        const { id } = req.params;
        const { name, lastname, phone, gender } = req.body;

        try {
            console.log(id, name, lastname, phone, gender);

            if (name === undefined && lastname === undefined && phone === undefined && gender === undefined) {
                console.log("Sin cambios");
                return res.status(204).send();  // No Content
            }

            const updatedStudent = await this.updateStudentUseCase.execute(Number(id), name, lastname, phone, gender);
            if (updatedStudent) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_student: updatedStudent
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Student not found"
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
                message: "An error occurred while update the user."
            });
        }
    }
}