import { query } from "../../../../database/mariadb";
import { Institution } from "../../domain/entities/institution";
import { InstitutionRepository } from "../../domain/repositories/institutionRepository";

export class MariaDBRepository implements InstitutionRepository {

    async createInstitution(name: string, educationLevel: string, term: string): Promise<any> {
        try {
            const sql = "INSERT INTO institution (name, educationLevel, term) VALUES (?,?,?)";
            const params: any[] = [name, educationLevel, term];
            const result = await query(sql, params);

            if (result && result.insertId) {
                const createdInstitution = new Institution(result.insertId, name, educationLevel, term);
                return createdInstitution;
            } else {
                throw new Error("Failed to create the category. No valid result obtained from the database.");
            }

        } catch (error) {
            console.error("Error adding institution:", error);
            return error as Error;
        }
    }

    async updateInstitution(id: number, name: string, educationLevel: string, term: string): Promise<any> {
        try {
            const sql = "UPDATE institution SET name = ?, educationLevel = ?, term = ? WHERE id = ?";
            const params: any[] = [name, educationLevel, term, id];
            const result = await query(sql, params);

            if (result && result.affectedRows > 0) {
                const updatedInstitution = new Institution(id, name, educationLevel, term);
                return updatedInstitution;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    async getInstitutionById(id: number): Promise<any> {
        try {
            const sql = "SELECT * FROM institution WHERE id = ?";
            const params: any[] = [id];
            const result = await query(sql, params);

            if (result && result.length > 0) {
                const getInstitutionById = result.map((data: any) => new Institution(
                    data.id,
                    data.name,
                    data.educationLevel,
                    data.term
                ));
                return getInstitutionById;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al obtener la institución:', error);
            return null;
        }
    }

    async getAllInstituions(): Promise<any> {
        try {
            const sql = "SELECT * FROM institution";
            const result = await query(sql, []);

            if (result.length === 0) {
                return null; // Si no hay resultados, se devuelve null
            }
            return result.map((institutions: any) =>
                new Institution(
                    institutions.id,
                    institutions.name,
                    institutions.educationLevel,
                    institutions.term,
                )
            );
        } catch (error) {
            return null;
        }
    }

    async deleteInstitution(id: number): Promise<any> {
        try {
            const [dataInstitutionDeleted]: any = await query('SELECT * FROM institution WHERE id = ?', [id]);

            if (!dataInstitutionDeleted || dataInstitutionDeleted.length === 0) {
                return "El ID proporcionado no pertenece a ninguna institución.";
            }

            const sql = "DELETE FROM institution WHERE id = ?";
            const params: any[] = [id];
            const result = await query(sql, params);

            if (result.affectedRows > 0) {
                const deletedInstitution = {
                    id: dataInstitutionDeleted[0].id,
                    name: dataInstitutionDeleted[0].name,
                    educationLevel: dataInstitutionDeleted[0].educationLevel,
                    term: dataInstitutionDeleted[0].term
                };
                return { message: "Institución eliminada", deletedInstitution };
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error deleting institution:", error);
            return error as Error;
        }
    }

}