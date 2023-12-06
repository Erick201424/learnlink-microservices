import { Request, Response } from "express";
import { UpdatePasswordByEmailUseCase } from "../../application/updatePasswordByEmailUseCase";

export class UpdatePasswordByEmailController {
    constructor(readonly updatePasswordUseCase: UpdatePasswordByEmailUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const updatedPasswordStudent = await this.updatePasswordUseCase.execute(email, password);

            if (updatedPasswordStudent) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        email: updatedPasswordStudent.email,
                        password: updatedPasswordStudent.password,
                        message: "La contraseña se a cambiado correctamente"

                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "User not found"
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('Duplicate entry') && error.message.includes('for key \'users.email\'')) {
                    return res.status(409).send({
                        status: "error",
                        message: "The email address is already in use. Please use a different email address.",
                    });
                } else if (error.message.startsWith('[')) {  // Suponiendo que los errores de validación comienzan con un corchete
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)  // Convertimos el mensaje de error en un objeto
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while update password."
            });
        }
    }
}