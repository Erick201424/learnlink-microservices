import { Subject } from "../domain/entities/subject";
import { SubjectRepository } from "../domain/repositories/subjectRepository";
import { ValidatorGetByIdSubject } from "../domain/validations/subjectValidation";
import { validate } from "class-validator";

export class GetByIdSubjectUseCase {
    constructor(readonly SubjectRepository: SubjectRepository) { }

    async execute(id: number): Promise<Subject | null> {
        const SubjectId = new ValidatorGetByIdSubject(id);
        const SubjectValidation = await validate(SubjectId);

        if (SubjectValidation.length > 0) {
            throw new Error(JSON.stringify(SubjectId));
        }

        try {
            const getSubject = await this.SubjectRepository.getByIdSubject(id);
            return getSubject;
        } catch (error) {
            return null;
        }
    }
}