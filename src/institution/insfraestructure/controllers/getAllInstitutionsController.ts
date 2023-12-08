import { Request, Response } from "express";
import { GetAllInstitutionsUseCase } from "../../application/getAllInstitutionsUseCase";

export class GetAllInstitutionsController {
    constructor(readonly getAllInstitutionsUseCase: GetAllInstitutionsUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            const listInstitutions = await this.getAllInstitutionsUseCase.execute();

            if (listInstitutions) {
                return res.status(200).json({
                    status: "success",
                    data: listInstitutions,
                    message: "Lista de Instituciones obtenida exitosamente",
                });
            } else {
                return res.status(404).json({
                    status: "error",
                    data: [],
                    message: "No se encontraron categorias",
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