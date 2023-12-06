import { Request, Response } from "express";
import { GetByCommunityIdUseCase } from "../../application/getByCommunityIdUseCase";

export class GetByCommunityIdController {
    constructor(readonly getByCommunityIdUseCase: GetByCommunityIdUseCase) { }

    async execute(req: Request, res: Response) {
        const id_community = parseInt(req.params.id_community, 10);

        // Verificar si id_community no es un número
        if (isNaN(id_community)) {
            console.log("Valor de id_community:", req.params.id_community); // Imprime el valor
            return res.status(400).json({
                status: "error",
                data: [],
                message: "El parámetro id_community no es un número válido",
            });
        }
        try {
            const listEvents = await this.getByCommunityIdUseCase.execute(id_community);

            if (listEvents) {
                return res.status(200).json({
                    status: "success",
                    data: listEvents,
                    message: "Eventos obtenidos",
                });
            } else {
                return res.status(404).json({
                    status: "error",
                    data: [],
                    message: "No se encontraron eventos en la comunidad",
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                data: [],
                message: "Error al obtener la lista de eventos",
            });
        }
    }
}