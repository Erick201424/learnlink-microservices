import { Student } from "../domain/entities/student";
import { StudentRepository } from "../domain/repositories/studentRepository";
import { ValidatorCreateStudent } from "../domain/validators/studentValidation";
import { validate } from "class-validator";
import { hashPassword } from "../../helpers/bycript.service";

export class CreateStudentUseCase {
    constructor(readonly studentRepository: StudentRepository) { }

    async execute(
        name: string,
        lastname: string,
        phone: string,
        gender: string,
        email: string,
        password: string,
        institution_id: number,
        career_id: number,
        securityQuestion: number,
        securityAnswer: string,
    ): Promise<Student | null | Error> {
        const studentValidation = new ValidatorCreateStudent(
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

        const studentValidate = await validate(studentValidation);

        if (studentValidate.length > 0) {
            throw new Error(JSON.stringify(studentValidate));
        }

        // Hash de la contraseña antes de almacenarla en la base de datos
        const hashedPassword = await hashPassword(password);

        try {
            const createdStudent = await this.studentRepository.createStudent(
                name,
                lastname,
                phone,
                gender,
                email,
                hashedPassword,
                institution_id,
                career_id,
                securityQuestion,
                securityAnswer,
            );

            return createdStudent;
        } catch (error) {
            console.error('Error creating student:', error);
            return null;
        }
    }
}