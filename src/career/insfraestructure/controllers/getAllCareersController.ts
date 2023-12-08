import { Request, Response } from "express";
import { GetAllCareersUseCase } from "../../application/getAllCareersUseCase";

export class GetAllCareersController {
    constructor(readonly getAllCareersUseCase: GetAllCareersUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            const listCareers = await this.getAllCareersUseCase.execute();

            if (listCareers) {
                return res.status(200).json({
                    status: "success",
                    data: listCareers,
                    message: "Lista de carreras obtenida exitosamente",
                });
            } else {
                return res.status(404).json({
                    status: "error",
                    data: [],
                    message: "No se encontraron carreras en la basa de datos",
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                data: [],
                message: "Error al obtener la lista de Instituciones",
            });
        }
    }
}