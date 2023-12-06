import { query } from "../../../../database/mariadb";
import { InstitutionCareerRelationship } from "../../domain/entities/institutionCareerRelationship";
import { InstitutionCareerRelationshipRepository } from "../../domain/repositories/institutionCareerRelationshipRepository";

export class MariaDBRepository implements InstitutionCareerRelationshipRepository {

    async createRelationship(institution_id: number, career_id: number): Promise<InstitutionCareerRelationship | null> {
        try {
            const sql = "INSERT INTO institution_career (institution_id, career_id) VALUES (?,?)";
            const params: any[] = [institution_id, career_id];
            const result = await query(sql, params);

            if (result && result.insertId) {
                const createdRelationship = new InstitutionCareerRelationship(result.insertId, institution_id, career_id);
                return createdRelationship;
            } else {
                throw new Error("Failed to create the relationshi´p. No valid result obtained from the database.");
            }
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear la relación entre institución y carrera');
        }
    }

    async updateRelationship(id: number, institution_id: number, career_id: number): Promise<InstitutionCareerRelationship | null> {
        try {
            const sql = "UPDATE institution_career SET institution_id = ?, career_id = ? WHERE id = ?";
            const params: any[] = [institution_id, career_id, id];
            const result = await query(sql, params);

            if (result.affectedRows > 0) {
                // Si se han actualizado filas, puedes devolver el objeto actualizado
                return new InstitutionCareerRelationship(id, institution_id, career_id);
            } else {
                throw new Error(`No se encontró la relación con el ID ${id} para actualizar.`);
            }

        } catch (error) {
            console.error(error);
            throw new Error('Error al actualizar la relación entre institución y carrera');
        }
    }

    async getCareersByInstitution(institution_id: number): Promise<string[] | null> {
        try {
            const sql = `
            SELECT c.name as career_name
            FROM institution_career icr
            INNER JOIN career c ON icr.career_id = c.id
            WHERE icr.institution_id = ?`;
            const params: any[] = [institution_id];
            const result = await query(sql, params);

            // Mapear los resultados a objetos de la entidad InstitutionCareerRelationship
            const careerNames: string[] = result.map((row: any) => row.career_name);

            return careerNames;

        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener las carreras por institución');
        }
    }

    async checkIfInstitutionExist(institution_id: number): Promise<boolean> {
        try {
            const sql = 'SELECT * FROM institution WHERE id = ?';
            const params: any[] = [institution_id];
            const result = await query(sql, params);

            if (result.length > 0) {
                console.log("La institución si existe");
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            throw new Error('Error al verificar la existencia de la institución');
        }
    }

    async checkIfCareerExist(career_id: number): Promise<boolean> {
        try {
            const sql = 'SELECT * FROM career WHERE id = ?';
            const params: any[] = [career_id];
            const result = await query(sql, params);

            console.log(result.length > 0);

            if (result.length > 0) {
                console.log("La carrera si existe");
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            throw new Error('Error al verificar la existencia de la carrera');
        }
    }

    async checkIfRelationshipExist(institution_id: number, career_id: number): Promise<boolean> {
        try {
            const sql = 'SELECT * FROM institution_career WHERE institution_id = ? AND career_id = ?';
            const params: any[] = [institution_id, career_id];
            const result = await query(sql, params);

            if (result.length > 0) {
                console.log("La relación si existe");
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            throw new Error('Error al verificar la existencia de la relación');
        }
    }
}