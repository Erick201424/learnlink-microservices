import { Subject } from "../domain/entities/subject";
import { SubjectRepository } from "../domain/repositories/subjectRepository";
import { ValidatorCreateSubject } from "../domain/validations/subjectValidation";
import { validate } from "class-validator";

export class CreateSubjectUseCase {
    constructor(readonly SubjectRepository: SubjectRepository) { }

    async execute(name: string,iduser:number): Promise<Subject | null> {
        const Subject = new ValidatorCreateSubject(name,iduser);
        const SubjectValidation = await validate(Subject);

        if (SubjectValidation.length > 0) {
            throw new Error(JSON.stringify(SubjectValidation));
        }

        try {
            const createSubject = await this.SubjectRepository.createSubject(name,iduser);
            return createSubject;
        } catch (error) {
            return null;
        }
    }
}