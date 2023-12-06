import fs from "fs";
import path from 'path';
import dotenv from "dotenv";
import mariadb from "mariadb";
import { Signale } from "signale";

const signale = new Signale();

dotenv.config();

export const pool = mariadb.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 3307,
})

export async function createTables() {
    let tablesCreated = false;
    try {
        const conn = await pool.getConnection();

        // Comprueba si las tablas ya existen
        const checkUsersQuery = "SHOW TABLES LIKE 'users';";
        const checkAddressQuery = "SHOW TABLES LIKE 'address';";

        const users = await conn.query(checkUsersQuery);
        const address = await conn.query(checkAddressQuery);

        // Si no se encontraron resultados, las tablas no existen y se pueden crear
        if (Array.isArray(users) || Array.isArray(address)) {
            if (users.length === 0 || address.length === 0) {
                const initializeFilePath = path.join(__dirname, 'initialize.sql');
                const initializeFileContent = fs.readFileSync(initializeFilePath, "utf-8");
                const sqlStatements = initializeFileContent.split(';');

                for (const sqlStatement of sqlStatements) {
                    if (sqlStatement.trim() !== '') {
                        await conn.query(sqlStatement);
                    }
                }
                tablesCreated = true;
            } else {
                tablesCreated = false;
            }
        }
        conn.release();
    } catch (error) {
        signale.error("Error al crear las tablas:", error);
    }
    return tablesCreated;
}

export async function query(sql: string, params: any[]) {
    try {
        const conn = await pool.getConnection();
        signale.success("Conexión exitosa a la BD");
        const result = await conn.execute(sql, params);
        conn.release();
        return result;
    } catch (error) {
        signale.error(error);
        return null;
    }
}