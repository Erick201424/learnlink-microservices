import { StudentByEvent } from "../domain/entities/student";
import { StudentRepository } from "../domain/repositories/studentRepository";

export class GetStudentsByEventUseCase {
    constructor(readonly studentRepository: StudentRepository) { }

    async execute(usersByEvent: any[]): Promise<StudentByEvent[] | null> {
        try {
            // Logging: Agregar un registro para indicar el comienzo del caso de uso
            console.log("Executing GetStudentsByEventUseCase...");

            const studentList = await this.studentRepository.getStudentsByEvent(usersByEvent);

            // Logging: Agregar un registro para indicar la finalización exitosa del caso de uso
            console.log("GetStudentsByEventUseCase completed successfully.");

            return studentList;
        } catch (error) {
            // Logging: Agregar un registro para indicar un error en el caso de uso
            console.error("Error in GetStudentsByEventUseCase:", error);

            // Manejo de errores: relanzar el error o manejarlo de alguna manera específica
            throw error; // O devolver un objeto que describa el error de manera más específica
        }
    }
}
