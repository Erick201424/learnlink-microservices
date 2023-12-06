import { Event } from "../entities/event";

export interface EventRepository {

    createEvent(description: string,id_community: number,location: string,date:string,starts_at:string,status:string): Promise<Event | null>;
    cancelEvent(id: number, status: string): Promise<Event | null>;
    getByIdEvent(id: number): Promise<Event | null>;
    getByCommunityId(id_community: number): Promise<Event[] | null>;

    getAllEvents(): Promise<Event[] | null>

}

// CREATE TABLE Event (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     day VARCHAR(25) NOT NULL,
//     start_at VARCHAR(25),
//     end_at VARCHAR(25),
//     iduser INT,
//     idEvent INT,
//     FOREIGN KEY (idEvent) REFERENCES Event(id) -- Define idEvent como llave foránea que referencia la columna id en la tabla Event
// );