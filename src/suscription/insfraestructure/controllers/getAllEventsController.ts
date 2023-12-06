// import { Request, Response } from "express";
// import { GetAllEventsUseCase } from "../../application/getAllEventsUseCase";

// export class GetAllEventsController {
//     constructor(readonly getAllEventsUseCase: GetAllEventsUseCase) { }

//     async execute(req: Request, res: Response) {
//         try {
//             const listEvents = await this.getAllEventsUseCase.execute();

//             if (listEvents) {
//                 return res.status(200).json({
//                     status: "success",
//                     data: listEvents,
//                     message: "Lista de eventos obtenida exitosamente",
//                 });
//             } else {
//                 return res.status(404).json({
//                     status: "error",
//                     data: [],
//                     message: "No se encontraron eventos en la basa de datos",
//                 });
//             }
//         } catch (error) {
//             return res.status(500).json({
//                 status: "error",
//                 data: [],
//                 message: "Error al obtener la lista de eventos",
//             });
//         }
//     }
// }