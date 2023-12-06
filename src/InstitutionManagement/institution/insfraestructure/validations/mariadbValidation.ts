import { query } from "../../../../database/mariadb";

//Validaciones
export async function checkIfInstitutionExist(id: number): Promise<boolean> {
    try {
        const sql = "SELECT COUNT(*) AS institutionExist FROM institution WHERE id = ?;";
        const params: any[] = [id];
        const result = await query(sql, params);

        return result[0].institutionCount > 0;
    } catch (error) {
        console.error(error, "\nError al verificar una instuticion");
        throw new Error('Error al verificar la existencia de una institucion');
    }
}