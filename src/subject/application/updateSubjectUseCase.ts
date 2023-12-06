import { Subject } from "../domain/entities/subject";
import { SubjectRepository } from "../domain/repositories/subjectRepository";
import { ValidatorUpdateSubject } from "../domain/validations/subjectValidation";
import { validate } from "class-validator";

export class UpdateSubjectUseCase {
    constructor(readonly SubjectRepository: SubjectRepository) { }

    async execute(id: number, name: string,iduser:number): Promise<Subject | null> {
        const Subject = new ValidatorUpdateSubject(id, name,iduser);
        const SubjectValidation = await validate(Subject);

        if (SubjectValidation.length > 0) {
            throw new Error(JSON.stringify(SubjectValidation));
        }

        try {
            const updateSubject = await this.SubjectRepository.updateSubject(id, name,iduser);
            return updateSubject;
        } catch (error) {
            return null;
        }
    }


}