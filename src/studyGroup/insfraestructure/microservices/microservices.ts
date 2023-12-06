import axios from 'axios';
import * as https from 'https';  // Importa el módulo 'https' de Node.js

const microservicioURL = 'https://localhost:3000/api/v1/';

export async function getStudentByID(id: number): Promise<any> {
    try {
        console.log("Recibe: ", id);

        // Configura el agente HTTPS con soporte para TLS 1.2
        const agent = new https.Agent({ rejectUnauthorized: false, secureProtocol: 'TLSv1_2_method' });

        // Realiza una petición GET al microservicio de Student
        const response = await axios.get(`${microservicioURL}user_services/user/${id}`, { httpsAgent: agent });

        // Maneja la respuesta del microservicio
        console.log('Respuesta del microservicio:', response.data);

        // Devuelve solo la parte de datos de la respuesta
        return response.data;
    } catch (error: unknown) {  // Puedes usar "unknown" en la cláusula catch
        if (error instanceof Error) {
            // Realiza acciones específicas para errores de tipo Error
            console.error('Error al hacer la petición al microservicio:', error.message);
        } else {
            // Realiza acciones para otros tipos de errores
            console.error('Error desconocido al hacer la petición al microservicio');
        }
        // Puedes devolver un objeto de error o manejarlo según tus necesidades
        throw error;
    }
}
