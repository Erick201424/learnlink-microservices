import { Suscription } from "../entities/suscription";

export interface SuscriptionRepository {

    createSuscription(id_user: number,id_event: number): Promise<Suscription | null>;
    // updateSuscription(id: number, name: string,iduser:number): Promise<Suscription | null>;
    // getByIdSuscription(id: number): Promise<Suscription | null>;
    getByEventId(id_event: number): Promise<Suscription[] | null>;

    // getAllSuscriptions(): Promise<Suscription[] | null>

}

// CREATE TABLE Suscription (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     day VARCHAR(25) NOT NULL,
//     start_at VARCHAR(25),
//     end_at VARCHAR(25),
//     iduser INT,
//     idSuscription INT,
//     FOREIGN KEY (idSuscription) REFERENCES Suscription(id) -- Define idSuscription como llave foránea que referencia la columna id en la tabla Suscription
// );