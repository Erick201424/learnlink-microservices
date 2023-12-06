import { Student } from "../domain/entities/student";
import { StudentRepository } from "../domain/repositories/studentRepository";
import { ValidatorUpdateStudent } from "../domain/validators/studentValidation";
import { validate } from "class-validator";

export class UpdateStudentUseCase {
    constructor(readonly studentRepository: StudentRepository) { }

    async execute(id: number, name?: string, lastname?: string, phone?: string, gender?: string): Promise<Student | null | Error | string> {
        const studentValidation = new ValidatorUpdateStudent(id, name, lastname, phone, gender);
        const studentValidate = await validate(studentValidation);

        if (studentValidate.length > 0) {
            throw new Error(JSON.stringify(studentValidate));
        }

        try {
            const updatedStudent = await this.studentRepository.updateStudent(id, name, lastname, phone, gender);
            return updatedStudent;
        } catch (error) {
            console.log("Error en el usecase")
            return null;
        }
    }
}