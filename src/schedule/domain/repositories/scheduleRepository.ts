import { Schedule } from "../entities/schedule";

export interface ScheduleRepository {

    createSchedule(day: string, start_at:string,end_at:string,idsubject:number,iduser:number): Promise<Schedule | null>;
    // updateSchedule(id: number, name: string,iduser:number): Promise<Schedule | null>;
    getByIdSchedule(id: number): Promise<Schedule | null>;
    getByStudentId(iduser: number): Promise<Schedule[] | null>;

    getAllSchedules(): Promise<Schedule[] | null>

}

// CREATE TABLE schedule (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     day VARCHAR(25) NOT NULL,
//     start_at VARCHAR(25),
//     end_at VARCHAR(25),
//     iduser INT,
//     idSchedule INT,
//     FOREIGN KEY (idSchedule) REFERENCES Schedule(id) -- Define idSchedule como llave foránea que referencia la columna id en la tabla Schedule
// );