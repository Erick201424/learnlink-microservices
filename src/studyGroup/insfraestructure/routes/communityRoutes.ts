import express, { Router } from "express";
import {
    createCommunityController,
    getByIdCommunityController,
    getAllCommunitysController,
    // updateCommunityController,
    // getByStudentIdController
} from "../dependencies";

export const communityRouter = Router();

communityRouter.post('/', createCommunityController.execute.bind(createCommunityController));
communityRouter.get('/:id', getByIdCommunityController.execute.bind(getByIdCommunityController));
// communityRouter.get('/user/:iduser', getByStudentIdController.execute.bind(getByStudentIdController));
communityRouter.get('/', getAllCommunitysController.execute.bind(getAllCommunitysController));
// communityRouter.put('/:id', updateCommunityController.execute.bind(updateCommunityController));