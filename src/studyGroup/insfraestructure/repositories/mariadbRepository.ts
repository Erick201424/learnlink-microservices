import { query } from "../../../database/mariadb";
import { Community } from "../../domain/entities/community";
import { CommunityRepository } from "../../domain/repositories/communityRepository";

export class MariaDBRepository implements CommunityRepository {

    async createCommunity(type: string, name: string, description: string, iduser: number): Promise<Community | null> {
        try {
            const sql = "INSERT INTO community (type,name,description,iduser) VALUES (?, ?, ?, ?)";
            const params: any[] = [type, name, description, iduser];
            const result = await query(sql, params);

            if (result && result.insertId) {
                const createdCommunity = new Community(result.insertId, type, name, description, iduser);
                return createdCommunity;
            } else {
                throw new Error("Failed to create the Community. No valid result obtained from the database.");
            }
        } catch (error) {
            console.error("Error adding Community:", error);
            return null;
        }
    }

    // async updateCommunity(id: number, name: string,iduser:number): Promise<Community | null> {
    //     try {
    //         const sql = "UPDATE Community SET name = ? WHERE id = ? AND iduser = ?";
    //         const params: any[] = [name, id,iduser];
    //         const result = await query(sql, params);

    //         if (result && result.affectedRows > 0) {
    //             const updatedCommunity = new Community(day,start_at,end_at,idsubject,iduser);
    //             return updatedCommunity;
    //         } else {
    //             return null;
    //         }
    //     } catch (error) {
    //         return null;
    //     }
    // }

    async getByIdCommunity(id: number): Promise<Community | null> {
        try {
            const sql = "SELECT * FROM community WHERE id = ?";
            const params: any[] = [id];
            const result = await query(sql, params);

            if (result && result.length > 0) {
                const getCommunityById = result.map((data: any) => new Community(
                    data.id,
                    data.type,
                    data.name,
                    data.description,
                    data.iduser,
                ));
                console.log(getCommunityById);
                return getCommunityById;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al obtener horario:', error);
            return null;
        }
    }

    async getAllCommunitys(): Promise<Community[] | null> {
        try {
            const sql = "SELECT * FROM community";
            const result = await query(sql, []);

            if (result.length === 0) {
                return null; // Si no hay resultados, se devuelve null
            }
            return result.map((Communitys: any) =>
                new Community(
                    Communitys.id,
                    Communitys.type,
                    Communitys.name,
                    Communitys.description,
                    Communitys.idsubject,
                )
            );
        } catch (error) {
            return null;
        }
    }
    // async getByStudentId(iduser: number): Promise<Community[] | null> {
    //     try {
    //         const sql = "SELECT s.id, s.day, s.start_at, s.end_at, su.name as subject_name, s.iduser FROM Community s JOIN subject su ON s.idsubject = su.id WHERE s.iduser = ?";
    //         const params: any[] = [iduser];
    //         const result = await query(sql, params);

    //         if (result.length === 0) {
    //             return null; // Si no hay resultados, se devuelve null
    //         }
    //         return result.map((Community: any) => ({
    //             id: Community.id,
    //             day: Community.day,
    //             start_at: Community.start_at,
    //             end_at: Community.end_at,
    //             idsubject: Community.idsubject,
    //             iduser: Community.iduser,
    //             subject_name: Community.subject_name // Nuevo campo para el nombre del subject
    //         }));
    //     } catch (error) {
    //         console.error('Error al obtener la asignatura:', error);
    //         return null;
    //     }
    // }

}