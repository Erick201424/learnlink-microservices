import expreess, { Router, Request, Response } from "express";
import {
    createInstitutionController,
    getByIdInstitutionController,
    getAllInstitutionsController,
    updateInstitutionController,
    deleteInstitutionController
} from "../dependencies";

export const institutionRouter = Router();

institutionRouter.get('/rutine', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutáda con éxito');
})

institutionRouter.post('/', createInstitutionController.execute.bind(createInstitutionController));
institutionRouter.get('/:id', getByIdInstitutionController.execute.bind(getByIdInstitutionController));
institutionRouter.get('/', getAllInstitutionsController.execute.bind(getAllInstitutionsController));
institutionRouter.put('/:id', updateInstitutionController.execute.bind(updateInstitutionController));
institutionRouter.delete('/:id', deleteInstitutionController.execute.bind(deleteInstitutionController));