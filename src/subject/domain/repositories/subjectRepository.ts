import { Subject } from "../entities/subject";

export interface SubjectRepository {

    createSubject(name: string, iduser:number): Promise<Subject | null>;
    updateSubject(id: number, name: string,iduser:number): Promise<Subject | null>;
    getByIdSubject(id: number): Promise<Subject | null>;
    getByStudentId(iduser: number): Promise<Subject[] | null>;

    getAllSubjects(): Promise<Subject[] | null>

}