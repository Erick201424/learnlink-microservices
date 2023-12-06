import express, { Router } from "express";
import {
    createSuscriptionController,
    getByEventIdController,
    // updateSuscriptionController,
} from "../dependencies";

export const SuscriptionRouter = Router();

SuscriptionRouter.post('/', createSuscriptionController.execute.bind(createSuscriptionController));
SuscriptionRouter.get('/:id', getByEventIdController.execute.bind(getByEventIdController));
// SuscriptionRouter.get('/community/:id_community', getByCommunityIdController.execute.bind(getByCommunityIdController));
// SuscriptionRouter.get('/', getAllSuscriptionsController.execute.bind(getAllSuscriptionsController));
// SuscriptionRouter.put('/:id', updateSuscriptionController.execute.bind(updateSuscriptionController));