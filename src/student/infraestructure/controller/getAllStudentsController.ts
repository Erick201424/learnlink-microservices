import { Request, Response } from "express";
import { GetAllStudentsUseCase } from "../../application/getAllStudentsUseCase";

export class GetAllStudentsController {
    constructor(readonly getAllStudentsUseCase: GetAllStudentsUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            const studentList = await this.getAllStudentsUseCase.execute();

            if (studentList) {
                return res.status(200).json({
                    status: "success",
                    data: studentList,
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