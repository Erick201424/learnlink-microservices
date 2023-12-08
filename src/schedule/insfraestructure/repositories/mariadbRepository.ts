import { query } from "../../../database/mariadb";
import { Schedule } from "../../domain/entities/schedule";
import { ScheduleRepository } from "../../domain/repositories/scheduleRepository";

export class MariaDBRepository implements ScheduleRepository {

    async createSchedule(day: string, start_at: string, end_at: string, idsubject: number, iduser: number): Promise<Schedule | null> {
        try {
            const sql = "INSERT INTO schedule (day,start_at,end_at,idsubject,iduser) VALUES (?, ?, ?, ?, ?)";
            const params: any[] = [day, start_at, end_at, idsubject, iduser];
            const result = await query(sql, params);

            if (result && result.insertId) {
                const createdSchedule = new Schedule(result.insertId, day, start_at, end_at, idsubject, iduser);
                return createdSchedule;
            } else {
                throw new Error("Failed to create the Schedule. No valid result obtained from the database.");
            }
        } catch (error) {
            console.error("Error adding Schedule:", error);
            return null;
        }
    }

    // async updateSchedule(id: number, name: string,iduser:number): Promise<Schedule | null> {
    //     try {
    //         const sql = "UPDATE Schedule SET name = ? WHERE id = ? AND iduser = ?";
    //         const params: any[] = [name, id,iduser];
    //         const result = await query(sql, params);

    //         if (result && result.affectedRows > 0) {
    //             const updatedSchedule = new Schedule(day,start_at,end_at,idsubject,iduser);
    //             return updatedSchedule;
    //         } else {
    //             return null;
    //         }
    //     } catch (error) {
    //         return null;
    //     }
    // }

    async getByIdSchedule(id: number): Promise<Schedule | null> {
        try {
            const sql = "SELECT * FROM schedule WHERE id = ?";
            const params: any[] = [id];
            const result = await query(sql, params);

            if (result && result.length > 0) {
                const getScheduleById = result.map((data: any) => new Schedule(
                    data.id,
                    data.day,
                    data.start_at,
                    data.end_at,
                    data.idsubject,
                    data.iduser
                ));
                return getScheduleById;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al obtener horario:', error);
            return null;
        }
    }

    async getAllSchedules(): Promise<Schedule[] | null> {
        try {
            const sql = "SELECT * FROM schedule";
            const result = await query(sql, []);

            if (result.length === 0) {
                return null; // Si no hay resultados, se devuelve null
            }
            return result.map((Schedules: any) =>
                new Schedule(
                    Schedules.id,
                    Schedules.day,
                    Schedules.start_at,
                    Schedules.end_at,
                    Schedules.idsubject,
                    Schedules.iduser
                )
            );
        } catch (error) {
            return null;
        }
    }
    async getByStudentId(iduser: number): Promise<Schedule[] | null> {
        try {
            const sql = "SELECT s.id, s.day, s.start_at, s.end_at, su.name as subject_name, s.iduser FROM schedule s JOIN subject su ON s.idsubject = su.id WHERE s.iduser = ?";
            const params: any[] = [iduser];
            const result = await query(sql, params);

            if (result.length === 0) {
                return null; // Si no hay resultados, se devuelve null
            }
            return result.map((schedule: any) => ({
                id: schedule.id,
                day: schedule.day,
                start_at: schedule.start_at,
                end_at: schedule.end_at,
                idsubject: schedule.idsubject,
                iduser: schedule.iduser,
                subject_name: schedule.subject_name // Nuevo campo para el nombre del subject
            }));
        } catch (error) {
            console.error('Error al obtener la asignatura:', error);
            return null;
        }
    }

}