import { Request, Response } from "express";
import { GetAllSubjectsUseCase } from "../../application/getAllSubjectsUseCase";

export class GetAllSubjectsController {
    constructor(readonly getAllSubjectsUseCase: GetAllSubjectsUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            const listSubjects = await this.getAllSubjectsUseCase.execute();

            if (listSubjects) {
                return res.status(200).json({
                    status: "success",
                    data: listSubjects,
                    message: "Lista de asignaturas obtenida exitosamente",
                });
            } else {
                return res.status(404).json({
                    status: "error",
                    data: [],
                    message: "No se encontraron asignaturas en la basa de datos",
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                data: [],
                message: "Error al obtener la lista de asignaturas",
            });
        }
    }
}