import { Student, StudentInformation, StudentLogin, securityInformation } from "../entities/student";

export interface StudentRepository {
    createStudent(
        name: string,
        lastname: string,
        phone: string,
        gender: string,
        email: string,
        password: string,
        institution_id: number,
        career_id: number,
        securityQuestion: number,
        securityAnswer: string,
    ): Promise<Student | null | Error>;

    updateStudent(
        id: number,
        name?: string,
        lastname?: string,
        phone?: string,
        gender?: string,
    ): Promise<Student | null | Error | string>;

    loginStudent(email: string, password: string): Promise<StudentLogin | null>;

    updatePasswordByEmail(email: string, password: string): Promise<Student | null>;

    validateEmailIfExist(email: string): Promise<securityInformation | null>;

    getStudentById(id: number): Promise<StudentInformation | null>;

    getAllStudents(): Promise<StudentInformation[] | null>;

}