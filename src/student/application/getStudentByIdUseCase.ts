import { StudentInformation } from "../domain/entities/student";
import { StudentRepository } from "../domain/repositories/studentRepository";
import { ValidatorGetById } from "../domain/validators/studentValidation";
import { validate } from "class-validator";

export class GetStudentByIdUseCase {
    constructor(readonly studentRepository: StudentRepository) { }

    async execute(id: number): Promise<StudentInformation | null> {
        const studentIdValidator = new ValidatorGetById(id);
        const studentIdValidate = await validate(studentIdValidator);

        if (studentIdValidate.length > 0) {
            throw new Error(JSON.stringify(studentIdValidate));
        }

        try {
            const getStudentById = await this.studentRepository.getStudentById(id);
            return getStudentById;
        } catch (error) {
            return null;
        }
    }
}