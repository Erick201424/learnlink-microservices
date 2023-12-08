import { query } from "../../../database/mariadb";
import { Student, StudentInformation, StudentLogin, securityInformation, StudentByEvent } from "../../domain/entities/student";
import { StudentRepository } from "../../domain/repositories/studentRepository";
import { generateToken } from "../../../helpers/token.helper";
import { comparePasswords, hashPassword } from "../../../helpers/bycript.service";

export class MariaDBRepository implements StudentRepository {

    async createStudent(name: string, lastname: string, phone: string, gender: string, email: string, password: string, institution_id: number, career_id: number, securityQuestion: number, securityAnswer: string): Promise<Student | null | Error> {
        try {
            const sql = "INSERT INTO students (name, lastname, phone, gender, email, password, institution_id, career_id, securityQuestion, securityAnswer) VALUES (?,?,?,?,?,?,?,?,?,?)";
            const params: any[] = [name, lastname, phone, gender, email, password, institution_id, career_id, securityQuestion, securityAnswer];
            console.log(sql, params)
            const result = await query(sql, params);
            console.log(result);

            if (result && result.insertId) {
                const createdStudent = new Student(result.insertId, name, lastname, phone, gender, email, password, institution_id, career_id, securityQuestion, securityAnswer);
                return createdStudent;
            } else {
                throw new Error("Failed to create the student. No valid result obtained from the database.");
            }
        } catch (error) {
            console.error("Error adding institution:", error);
            return error as Error;
        }
    }

    async updateStudent(id: number, name?: string, lastname?: string, phone?: string, gender?: string): Promise<Student | null | Error | string> {
        const updates: { [key: string]: string | number } = {};

        if (name !== undefined) updates.name = name;
        if (lastname !== undefined) updates.lastname = lastname;
        if (phone !== undefined) updates.phone = phone;
        if (gender !== undefined) updates.gender = gender;

        const keys = Object.keys(updates);
        if (keys.length === 0) return null; // No hay nada que actualizar.

        const sqlParts = keys.map(key => `${key} = ?`);
        const sql = `UPDATE students SET ${sqlParts.join(', ')} WHERE id = ?`;
        try {
            const [studentData]: any = await query('SELECT * FROM students WHERE id = ?', [id]);
            if (!studentData || studentData.length === 0) {
                throw new Error('No driver found with the provided id.');
            }

            const values = keys.map(key => updates[key]);
            values.push(id); // Añade el id al final del array de valores.
            await query(sql, values); // Ejecuta la consulta SQL.

            const sqlRows = "SELECT * FROM students WHERE id = ?;";
            const params: any[] = [id];
            const result = await query(sqlRows, params);

            if (result && result.length > 0) {
                const studentsDatas = result[0];

                return new Student(
                    studentsDatas.id,
                    studentsDatas.name,
                    studentsDatas.lastname,
                    studentsDatas.phone,
                    studentsDatas.gender,
                    studentsDatas.email,
                    studentsDatas.password,
                    studentsDatas.institution_id,
                    studentsDatas.career_id,
                    studentsDatas.securityQuestion,
                    studentsDatas.securityAnswer,
                );
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error updating driver:', error);
            return null
        }
    }

    async loginStudent(email: string, password: string): Promise<StudentLogin | null> {
        try {
            const sql = "SELECT * FROM students WHERE email = ? LIMIT 1;"
            const params: any[] = [email];
            const result = await query(sql, params);

            if (result && result.length > 0) {
                const studentData = result[0];

                // Comparar contraseñas usando bcrypt
                const passwordMatch = await comparePasswords(password, studentData.password);

                if (passwordMatch) {
                    // Contraseña correcta, crear y devolver el objeto Student
                    const payload = {
                        id: studentData.id,
                        email: studentData.email,
                        name: studentData.name,
                    };

                    const token = generateToken(payload);

                    return new StudentLogin(
                        studentData.id,
                        studentData.name,
                        studentData.lastname,
                        studentData.phone,
                        studentData.gender,
                        studentData.email,
                        studentData.institution_id,
                        studentData.career_id,
                        token
                    );
                } else {
                    // Contraseña incorrecta
                    return null;
                }
            } else {
                return null; // No se encontró ningún estudiante con el correo electrónico proporcionado
            }
        } catch (error) {
            console.error("Error during student retrieval:", error);
            return null;
        }
    }

    async getStudentById(id: number): Promise<StudentInformation | null> {
        try {
            const sql = "SELECT * FROM students WHERE id = ?";
            const params: any[] = [id];
            const result = await query(sql, params);

            if (result && result.length > 0) {
                const studentById = result.map((data: any) => new StudentInformation(
                    data.name,
                    data.lastname,
                    data.phone,
                    data.gender,
                    data.email,
                    data.institution_id,
                    data.career_id,
                ));
                return studentById;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al obtener la institución:', error);
            return null;
        }
    }

    async getAllStudents(): Promise<StudentInformation[] | null> {
        try {
            const sql = "SELECT * FROM students";
            const result = await query(sql, []);

            if (result.length === 0) {
                return null; // Si no hay resultados, se devuelve null
            }
            return result.map((students: any) =>
                new StudentInformation(
                    students.name,
                    students.lastname,
                    students.phone,
                    students.gender,
                    students.email,
                    students.institution_id,
                    students.career_id,
                )
            );
        } catch (error) {
            return null;
        }
    }

    async validateEmailIfExist(email: string): Promise<securityInformation | null> {
        try {
            const sql = "SELECT securityQuestion, securityAnswer FROM students WHERE email = ? LIMIT 1;"
            const params: any[] = [email];
            const result = await query(sql, params);

            if (result && result.length > 0) {
                const studentData = result[0];

                return new securityInformation(
                    studentData.securityQuestion,
                    studentData.securityAnswer
                );
            } else {
                // Contraseña incorrecta
                return null;
            }
        } catch (error) {
            console.error("Error during student retrieval:", error);
            return null;
        }

    }

    async updatePasswordByEmail(email: string, password: string): Promise<Student | null> {
        try {
            const hashedPassword = await hashPassword(password);

            const sql = "UPDATE students SET password = ? WHERE email = ?";
            const params: any[] = [hashedPassword, email];
            const result = await query(sql, params);

            if (!result || result.affectedRows === 0) return null;

            const sqlUpdate = "SELECT * FROM students WHERE email = ?;";
            const paramsUpdate: any[] = [email];
            const resultUpdate = await query(sqlUpdate, paramsUpdate);

            if (resultUpdate && resultUpdate.length > 0) {
                const studentsDatas = resultUpdate[0];

                return new Student(
                    studentsDatas.id,
                    studentsDatas.name,
                    studentsDatas.lastname,
                    studentsDatas.phone,
                    studentsDatas.gender,
                    studentsDatas.email,
                    studentsDatas.password,
                    studentsDatas.institution_id,
                    studentsDatas.career_id,
                    studentsDatas.securityQuestion,
                    studentsDatas.securityAnswer,
                );
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error during student retrieval:", error);
            return null;
        }
    }

    async getStudentsByEvent(usersByEvent: any[]): Promise<StudentByEvent[] | null> {
        try {
            let users: StudentByEvent[] = [];

            for (const id of usersByEvent) {
                const sql = "SELECT name, lastname, phone FROM students WHERE id = ? ;";
                const params: any[] = [id];
                const result = await query(sql, params);

                if (result && result.length > 0) {
                    users.push(result[0]);
                } else {
                    // Manejar el caso en el que la consulta no devuelve resultados
                    console.warn(`No se encontraron resultados para el usuario con ID ${id}`);
                }
            }
            return users;
        } catch (error) {
            // Lanzar el error nuevamente para que se maneje en capas superiores
            throw error;
        }
    }

}