import expreess, { Router } from "express";
import {
    createRelationshipInstitutionCareerController,
    getCareersByInstitutionController,
    updateRelationshipInstitutionCareerController
} from "../dependencies";

export const relationshipInstitutionCareerRouter = Router();

relationshipInstitutionCareerRouter.post('/', createRelationshipInstitutionCareerController.execute.bind(createRelationshipInstitutionCareerController));
relationshipInstitutionCareerRouter.put('/:id', updateRelationshipInstitutionCareerController.execute.bind(updateRelationshipInstitutionCareerController));
relationshipInstitutionCareerRouter.get('/:institution_id/list', getCareersByInstitutionController.execute.bind(getCareersByInstitutionController));