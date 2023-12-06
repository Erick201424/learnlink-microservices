import { query } from "../../../database/mariadb";
import { Subject } from "../../domain/entities/subject";
import { SubjectRepository } from "../../domain/repositories/subjectRepository";

export class MariaDBRepository implements SubjectRepository {

    async createSubject(name: string, iduser: number): Promise<Subject | null> {
        try {
            const sql = "INSERT INTO subject (name, iduser) VALUES (?, ?)";
            const params: any[] = [name, iduser];
            const result = await query(sql, params);

            if (result && result.insertId) {
                const createdSubject = new Subject(result.insertId, name, iduser);
                return createdSubject;
            } else {
                throw new Error("Failed to create the Subject. No valid result obtained from the database.");
            }
        } catch (error) {
            console.error("Error adding subject:", error);
            return null;
        }
    }

    async updateSubject(id: number, name: string, iduser: number): Promise<Subject | null> {
        try {
            const sql = "UPDATE subject SET name = ? WHERE id = ? AND iduser = ?";
            const params: any[] = [name, id, iduser];
            const result = await query(sql, params);

            if (result && result.affectedRows > 0) {
                const updatedSubject = new Subject(id, name, iduser);
                return updatedSubject;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    async getByIdSubject(id: number): Promise<Subject | null> {
        try {
            const sql = "SELECT * FROM subject WHERE id = ?";
            const params: any[] = [id];
            const result = await query(sql, params);

            if (result && result.length > 0) {
                const getSubjectById = result.map((data: any) => new Subject(
                    data.id,
                    data.name,
                    data.iduser
                ));
                return getSubjectById;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al obtener la asignatura:', error);
            return null;
        }
    }

    async getAllSubjects(): Promise<Subject[] | null> {
        try {
            const sql = "SELECT * FROM subject";
            const result = await query(sql, []);

            if (result.length === 0) {
                return null; // Si no hay resultados, se devuelve null
            }
            return result.map((Subjects: any) =>
                new Subject(
                    Subjects.id,
                    Subjects.name,
                    Subjects.iduser
                )
            );
        } catch (error) {
            return null;
        }
    }
    async getByStudentId(iduser: number): Promise<Subject[] | null> {
        try {
            const sql = "SELECT * FROM subject WHERE iduser = ?";
            const params: any[] = [iduser];
            const result = await query(sql, params);

            if (result.length === 0) {
                return null; // Si no hay resultados, se devuelve null
            }
            return result.map((Subjects: any) =>
                new Subject(
                    Subjects.id,
                    Subjects.name,
                    Subjects.iduser
                )
            );
        } catch (error) {
            console.error('Error al obtener la asignatura:', error);
            return null;
        }
    }

}