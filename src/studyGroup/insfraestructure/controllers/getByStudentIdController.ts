// import { Request, Response } from "express";
// import { GetByStudentIdUseCase } from "../../application/getByStudentIdUseCase";

// export class GetByStudentIdController {
//     constructor(readonly GetByStudentIdUseCase: GetByStudentIdUseCase) { }

//     async execute(req: Request, res: Response) {
//         const iduser = parseInt(req.params.iduser, 10);

//         try {
//             const listSubjects = await this.GetByStudentIdUseCase.execute(iduser);

//             if (listSubjects) {
//                 return res.status(200).json({
//                     status: "success",
//                     data: listSubjects,
//                     message: "Lista de horario obtenida exitosamente",
//                 });
//             } else {
//                 return res.status(404).json({
//                     status: "error",
//                     data: [],
//                     message: "No se encontraron horarios en la basa de datos",
//                 });
//             }
//         } catch (error) {
//             return res.status(500).json({
//                 status: "error",
//                 data: [],
//                 message: "Error al obtener la lista de horario",
//             });
//         }
//     }
// }