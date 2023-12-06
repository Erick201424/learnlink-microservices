import { Request, Response } from "express";
import { GetAllCommunitysUseCase } from "../../application/getAllCommunitysUseCase";

export class GetAllCommunitysController {
    constructor(readonly getAllCommunitysUseCase: GetAllCommunitysUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            const listCommunitys = await this.getAllCommunitysUseCase.execute();

            if (listCommunitys) {
                return res.status(200).json({
                    status: "success",
                    data: listCommunitys,
                    message: "Lista de comunidades obtenida exitosamente",
                });
            } else {
                return res.status(404).json({
                    status: "error",
                    data: [],
                    message: "No se encontraron comunidades en la basa de datos",
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                data: [],
                message: "Error al obtener la lista de comunidades",
            });
        }
    }
}