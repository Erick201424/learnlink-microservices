import { Request, Response } from "express";
import { GetAllSchedulesUseCase } from "../../application/getAllSchedulesUseCase";

export class GetAllSchedulesController {
    constructor(readonly getAllSchedulesUseCase: GetAllSchedulesUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            const listSchedules = await this.getAllSchedulesUseCase.execute();

            if (listSchedules) {
                return res.status(200).json({
                    status: "success",
                    data: listSchedules,
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