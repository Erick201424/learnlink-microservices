import { Subject } from "../domain/entities/subject";
import { SubjectRepository } from "../domain/repositories/subjectRepository";
import { ValidatorGetByIdSubject, ValidatorGetByStudentId } from "../domain/validations/subjectValidation";
import { validate } from "class-validator";

export class GetByStudentIdUseCase {
    constructor(readonly SubjectRepository: SubjectRepository) { }

    async execute(iduser: number): Promise<Subject[] | null> {
        const SubjectId = new ValidatorGetByStudentId(iduser);
        const SubjectValidation = await validate(SubjectId);

        if (SubjectValidation.length > 0) {
            throw new Error(JSON.stringify(SubjectId));
        }

        try {
            const getSubject = await this.SubjectRepository.getByStudentId(iduser);
            return getSubject;
        } catch (error) {
            return null;
        }
    }
}