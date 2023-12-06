import { StudentInformation } from "../domain/entities/student";
import { StudentRepository } from "../domain/repositories/studentRepository";

export class GetAllStudentsUseCase {
    constructor(readonly studentRepository: StudentRepository) { }

    async execute(): Promise<StudentInformation[] | null> {
        try {
            const studentList = await this.studentRepository.getAllStudents();
            return studentList;
        } catch (error) {
            return null;
        }
    }
}