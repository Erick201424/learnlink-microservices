import { query } from "../../../../database/mariadb";
import { Career } from "../../domain/entities/career";
import { CareerRepository } from "../../domain/repositories/careerRepository";

export class MariaDBRepository implements CareerRepository {

    async createCareer(name: string): Promise<Career | null> {
        try {
            const sql = "INSERT INTO career (name) VALUES (?)";
            const params: any[] = [name];
            const result = await query(sql, params);

            if (result && result.insertId) {
                const createdCareer = new Career(result.insertId, name);
                return createdCareer;
            } else {
                throw new Error("Failed to create the career. No valid result obtained from the database.");
            }
        } catch (error) {
            console.error("Error adding institution:", error);
            return null;
        }
    }

    async updateCareer(id: number, name: string): Promise<Career | null> {
        try {
            const sql = "UPDATE career SET name = ? WHERE id = ?";
            const params: any[] = [name, id];
            const result = await query(sql, params);

            if (result && result.affectedRows > 0) {
                const updatedCareer = new Career(id, name);
                return updatedCareer;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    async getByIdCareer(id: number): Promise<Career | null> {
        try {
            const sql = "SELECT * FROM career WHERE id = ?";
            const params: any[] = [id];
            const result = await query(sql, params);

            if (result && result.length > 0) {
                const getCareerById = result.map((data: any) => new Career(
                    data.id,
                    data.name
                ));
                return getCareerById;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al obtener la carrera:', error);
            return null;
        }
    }

    async getAllCareers(): Promise<Career[] | null> {
        try {
            const sql = "SELECT * FROM career";
            const result = await query(sql, []);

            if (result.length === 0) {
                return null; // Si no hay resultados, se devuelve null
            }
            return result.map((careers: any) =>
                new Career(
                    careers.id,
                    careers.name
                )
            );
        } catch (error) {
            return null;
        }
    }
}