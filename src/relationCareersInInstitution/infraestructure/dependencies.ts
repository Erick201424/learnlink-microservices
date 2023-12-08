import { MariaDBRepository } from "./repositories/mariadbRepository";

import { CreateInstitutionCareerRelationshipUseCase } from "../application/createRelationshipInstitutionCareerUseCase";
import { CreateInstitutionCareerRelationshipController } from "./controllers/createRelationshipInstitutionCareerController";

import { UpdateInstitutionCareerRelationshipUseCase } from "../application/updateRelationshipInstitutionCareerUseCase";
import { UpdateInstitutionCareerRelationshipController } from "./controllers/updateRelationshipInstitutionCareerController";

import { GetCareersByInstitutionUseCase } from "../application/getCareersByInstitutionUseCase";
import { GetCareerByInstitutionController } from "./controllers/getCareersByInstitutionController";

export const mariadbRepository = new MariaDBRepository();

export const createRelationshipInstitutionCareerUseCase = new CreateInstitutionCareerRelationshipUseCase(mariadbRepository);
export const createRelationshipInstitutionCareerController = new CreateInstitutionCareerRelationshipController(createRelationshipInstitutionCareerUseCase);

export const updateRelationshipInstitutionCareerUseCase = new UpdateInstitutionCareerRelationshipUseCase(mariadbRepository);
export const updateRelationshipInstitutionCareerController = new UpdateInstitutionCareerRelationshipController(updateRelationshipInstitutionCareerUseCase);

export const getCareersByInstitutionUseCase = new GetCareersByInstitutionUseCase(mariadbRepository);
export const getCareersByInstitutionController = new GetCareerByInstitutionController(getCareersByInstitutionUseCase);