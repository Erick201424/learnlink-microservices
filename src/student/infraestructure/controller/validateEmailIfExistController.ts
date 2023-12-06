import { Request, Response } from "express";
import { ValidateEmailUseCase } from "../../application/validateEmailIfExistsUseCase";

export class ValidateEmailController {
    constructor(readonly validateEmailUseCase: ValidateEmailUseCase) { }

    async execute(req: Request, res: Response) {
        const email = req.body.email;

        try {
            const emailExist = await this.validateEmailUseCase.execute(email);

            if (emailExist) {
                return res.status(200).json({
                    status: "success",
                    data: emailExist,
                    message: "Inicio de sesión exitoso",
                });
            } else {
                return res.status(401).json({
                    status: "error",
                    message: "Credenciales inválidas",
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
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}