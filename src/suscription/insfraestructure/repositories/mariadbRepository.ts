import { query } from "../../../database/mariadb";
import { Suscription } from "../../domain/entities/suscription";
import { SuscriptionRepository } from "../../domain/repositories/suscriptionRepository";

export class MariaDBRepository implements SuscriptionRepository {

    async createSuscription(id_event: number, id_user: number): Promise<Suscription | null> {
        try {
            const sql = "INSERT INTO attendance (id_event,id_user) VALUES (?, ?)";
            const params: any[] = [id_event, id_user];
            const result = await query(sql, params);

            if (result && result.insertId) {
                const createdSuscription = new Suscription(result.insertId, id_event, id_user);
                return createdSuscription;
            } else {
                throw new Error("Failed to create the Suscription. No valid result obtained from the database.");
            }
        } catch (error) {
            console.error("Error adding Suscription:", error);
            return null;
        }
    }

    // async updateSuscription(id: number, name: string,id_community:number): Promise<Suscription | null> {
    //     try {
    //         const sql = "UPDATE Suscription SET name = ? WHERE id = ? AND id_community = ?";
    //         const params: any[] = [name, id,id_community];
    //         const result = await query(sql, params);

    //         if (result && result.affectedRows > 0) {
    //             const updatedSuscription = new Suscription(day,start_at,end_at,idsubject,id_community);
    //             return updatedSuscription;
    //         } else {
    //             return null;
    //         }
    //     } catch (error) {
    //         return null;
    //     }
    // }

    // async getByIdSuscription(id: number): Promise<Suscription | null> {
    //     try {
    //         const sql = "SELECT * FROM Suscription WHERE id = ?";
    //         const params: any[] = [id];
    //         const result = await query(sql, params);

    //         if (result && result.length > 0) {
    //             const getSuscriptionById = result.map((data: any) => new Suscription(
    //                 data.id,
    //                 data.description,
    //                 data.id_community,
    //                 data.location,
    //                 data.date,
    //                 data.starts_at,
    //             ));
    //             return getSuscriptionById;
    //         } else {
    //             return null;
    //         }
    //     } catch (error) {
    //         console.error('Error al obtener horario:', error);
    //         return null;
    //     }
    // }

    // async getAllSuscriptions(): Promise<Suscription[] | null> {
    //     try {
    //         const sql = "SELECT * FROM Suscription";
    //         const result = await query(sql, []);

    //         if (result.length === 0) {
    //             return null; // Si no hay resultados, se devuelve null
    //         }
    //         return result.map((Suscriptions: any) =>
    //             new Suscription(
    //                 Suscriptions.id,
    //                 Suscriptions.description,
    //                 Suscriptions.id_community,
    //                 Suscriptions.location,
    //                 Suscriptions.date,
    //                 Suscriptions.starts_at,

    //             )
    //         );
    //     } catch (error) {
    //         return null;
    //     }
    // }
    async getByEventId(id: number): Promise<Suscription[] | null> {
        try {
            const sql = "SELECT * FROM attendance WHERE attendance.id_event = ?";
            const params: any[] = [id];
            console.log(params);
            const result = await query(sql, params);

            // , users.email AS user_email FROM attendance JOIN users ON attendance.id_user = users.id

            if (result.length === 0) {
                return null; // Si no hay resultados, se devuelve null
            }
            return result.map((Suscription: any) => ({
                event: Suscription.id_event,
                user: Suscription.id_user,

                // Nuevo campo para el nombre del subject
            }));
        } catch (error) {
            console.error('Error al obtener Suscriptions del evento:', error);
            return null;
        }
    }

}