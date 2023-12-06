import { Community } from "../entities/community";

export interface CommunityRepository {

    createCommunity(type: string, name:string,description:string,iduser:number): Promise<Community | null>;
    // updateCommunity(id: number, name: string,iduser:number): Promise<Community | null>;
    getByIdCommunity(id: number): Promise<Community | null>;
    // getByStudentId(iduser: number): Promise<Community[] | null>;

    getAllCommunitys(): Promise<Community[] | null>

}

// CREATE TABLE Community (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     day VARCHAR(25) NOT NULL,
//     start_at VARCHAR(25),
//     end_at VARCHAR(25),
//     iduser INT,
//     idCommunity INT,
//     FOREIGN KEY (idCommunity) REFERENCES Community(id) -- Define idCommunity como llave foránea que referencia la columna id en la tabla Community
// );