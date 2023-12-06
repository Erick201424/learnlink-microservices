import express, { Router, Request, Response } from "express";
import {
    createCareerController,
    getByIdCareerController,
    getAllCareersController,
    updateCareerController
} from "../dependencies";

export const careerRouter = Router();

careerRouter.get('/rutine', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutáda con éxito');
})

careerRouter.post('/', createCareerController.execute.bind(createCareerController));
careerRouter.get('/:id', getByIdCareerController.execute.bind(getByIdCareerController));
careerRouter.get('/', getAllCareersController.execute.bind(getAllCareersController));
careerRouter.put('/:id', updateCareerController.execute.bind(updateCareerController));