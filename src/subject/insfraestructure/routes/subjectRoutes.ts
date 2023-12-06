import express, { Router, Request, Response } from "express";
import {
    createSubjectController,
    getByIdSubjectController,
    getAllSubjectsController,
    updateSubjectController,
    getByStudentIdController
} from "../dependencies";

export const subjectRouter = Router();

subjectRouter.get('/rutine', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutáda con éxito');
})

subjectRouter.post('/', createSubjectController.execute.bind(createSubjectController));
subjectRouter.get('/:id', getByIdSubjectController.execute.bind(getByIdSubjectController));
subjectRouter.get('/user/:iduser', getByStudentIdController.execute.bind(getByStudentIdController));
subjectRouter.get('/', getAllSubjectsController.execute.bind(getAllSubjectsController));
subjectRouter.put('/:id', updateSubjectController.execute.bind(updateSubjectController));