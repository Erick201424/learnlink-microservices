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
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
})

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