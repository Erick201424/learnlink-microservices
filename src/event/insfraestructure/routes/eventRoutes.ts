import express, { Router, Request, Response } from "express";
import {
    createEventController,
    getByIdEventController,
    getAllEventsController,
    cancelEventController,
    getByCommunityIdController
} from "../dependencies";

export const eventRouter = Router();

eventRouter.get('/rutine', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutáda con éxito');
})

eventRouter.post('/', createEventController.execute.bind(createEventController));
eventRouter.get('/:id', getByIdEventController.execute.bind(getByIdEventController));
eventRouter.get('/community/:id_community', getByCommunityIdController.execute.bind(getByCommunityIdController));
eventRouter.get('/', getAllEventsController.execute.bind(getAllEventsController));
eventRouter.put('/:id', cancelEventController.execute.bind(cancelEventController));

// EventRouter.put('/:id', updateEventController.execute.bind(updateEventController));