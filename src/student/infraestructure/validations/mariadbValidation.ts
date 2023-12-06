import { query } from "../../../database/mariadb";

//Validaciones
export async function checkIfEmailExist(email: string): Promise<boolean> {
    try {
        const sql = "SELECT COUNT(*) AS emailExist FROM students where email = ?;"
        const params: any[] = [email];
        const result = await query(sql, params);

        return result[0].emailCount > 0;
    } catch (error) {
        console.error(error);
        throw new Error('Error al verificar la existencia de un correo');
    }
}