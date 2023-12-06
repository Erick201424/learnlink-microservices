import { Subject } from "../domain/entities/subject";
import { SubjectRepository } from "../domain/repositories/subjectRepository";

export class GetAllSubjectsUseCase {
    constructor(readonly SubjectRepository: SubjectRepository) { }

    async execute(): Promise<Subject[] | null> {
        try {
            const listSubjects = await this.SubjectRepository.getAllSubjects();
            return listSubjects;
        } catch (error) {
            return null;
        }
    }
}