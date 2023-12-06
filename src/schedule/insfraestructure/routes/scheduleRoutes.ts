import express, { Router } from "express";
import {
    createSubjectController,
    getByIdSubjectController,
    getAllSubjectsController,
    updateSubjectController,
    getByStudentIdController
} from "../dependencies";

export const scheduleRouter = Router();

scheduleRouter.post('/', createSubjectController.execute.bind(createSubjectController));
scheduleRouter.get('/:id', getByIdSubjectController.execute.bind(getByIdSubjectController));
scheduleRouter.get('/user/:iduser', getByStudentIdController.execute.bind(getByStudentIdController));
scheduleRouter.get('/', getAllSubjectsController.execute.bind(getAllSubjectsController));
// scheduleRouter.put('/:id', updateSubjectController.execute.bind(updateSubjectController));