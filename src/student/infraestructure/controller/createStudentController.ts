import { Request, Response } from "express";
import { Student } from "../../domain/entities/student";
import { CreateStudentUseCase } from "../../application/createStudentUseCase";
import { checkIfEmailExist } from "../validations/mariadbValidation";

export class CreateStudentController {
    constructor(readonly createStudentUseCase: CreateStudentUseCase) { }

    async execute(req: Request, res: Response) {
        const {
            name,
            lastname,
            phone,
            gender,
            email,
            password,
            institution_id,
            career_id,
            securityQuestion,
            securityAnswer
        } = req.body;


        try {
            const emailExist = await checkIfEmailExist(email);
            if (emailExist) {
                console.log("El correo electrónico ya existe");
                return res.status(409).send({
                    status: 'error',
                    message: 'El correo electrónico ya está registrado en la base de datos.',
                });
            }

            console.log(name, lastname, phone, gender, email, password, institution_id, career_id, securityQuestion, securityAnswer);

            const createdStudent = await this.createStudentUseCase.execute(
                name,
                lastname,
                phone,
                gender,
                email,
                password,
                institution_id,
                career_id,
                securityQuestion,
                securityAnswer
            );


            if (createdStudent instanceof Student) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        name: createdStudent.name,
                        lastname: createdStudent.lastname,
                        phone: createdStudent.phone,
                        gender: createdStudent.gender,
                        email: createdStudent.email,
                        password: createdStudent.password,
                        institution_id: createdStudent.institution_id,
                        career_id: createdStudent.career_id,
                        securityQuestion: createdStudent.securityQuestion,
                        securityAnswer: createdStudent.securityAnswer
                    },
                    message: "El usuario ha sido agregado a la base de datos",
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while register the student."
                });
            }
        } catch (error: any) {
            console.error('Unexpected error:', error);
            // Manejo de errores específicos
            if (error instanceof Error) {
                if (error.message.includes('Duplicate entry') && error.message.includes('for key \'student.email\'')) {
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

            // Para errores generales, se devuelve un error 500 con un mensaje genérico
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
                error: error.message  // Agrega el mensaje de error al objeto de respuesta
            });
        }
    }
}
