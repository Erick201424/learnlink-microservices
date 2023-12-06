import { Student, StudentLogin } from "../domain/entities/student";
import { StudentRepository } from "../domain/repositories/studentRepository";
import { ValidatorLoginStudent } from "../domain/validators/studentValidation";
import { validate } from "class-validator";

export class LoginStudentUseCase {
    constructor(readonly studentRepository: StudentRepository) { }

    async execute(email: string, password: string): Promise<StudentLogin | null> {
        const studentLogin = new ValidatorLoginStudent(email, password);
        const studentLoginValidate = await validate(studentLogin);

        if (studentLoginValidate.length > 0) {
            throw new Error(JSON.stringify(studentLoginValidate));
        }

        try {
            const loggedStudent = await this.studentRepository.loginStudent(email, password);
            return loggedStudent;
        } catch (error) {
            console.error('Error during login use case:', error);
            return null;
        }
    }
}