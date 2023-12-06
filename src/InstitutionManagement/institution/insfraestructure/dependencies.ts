import { MariaDBRepository } from "./repositories/mariadbRepository";

import { CreateInstitutionUseCase } from "../application/createInstitutionUseCase";
import { CreateInstitutionController } from "./controllers/createInstitutionController";

import { GetByIdInstitutionUseCase } from "../application/getByIdInstitutionUseCase";
import { GetByIdInstitutionController } from "./controllers/getByIdInstitutionController";

import { GetAllInstitutionsUseCase } from "../application/getAllInstitutionsUseCase";
import { GetAllInstitutionsController } from "./controllers/getAllInstitutionsController";

import { UpdateInstitutionUseCase } from "../application/updateInstitutionUseCase";
import { UpdateInstitutionController } from "./controllers/updateInstitutionController";

import { DeleteInstitutionUseCase } from "../application/deleteInstitutionUseCase";
import { DeleteInstitutionController } from "./controllers/deleteInstitutionController";

export const mariadbRepository = new MariaDBRepository();

export const createInstitutionUseCase = new CreateInstitutionUseCase(mariadbRepository);
export const createInstitutionController = new CreateInstitutionController(createInstitutionUseCase);

export const getByIdInstitutionUseCase = new GetByIdInstitutionUseCase(mariadbRepository);
export const getByIdInstitutionController = new GetByIdInstitutionController(getByIdInstitutionUseCase);

export const getAllInstitutionsUseCase = new GetAllInstitutionsUseCase(mariadbRepository);
export const getAllInstitutionsController = new GetAllInstitutionsController(getAllInstitutionsUseCase);

export const updateInstitutionUseCase = new UpdateInstitutionUseCase(mariadbRepository);
export const updateInstitutionController = new UpdateInstitutionController(updateInstitutionUseCase);

export const deleteInstitutionUseCase = new DeleteInstitutionUseCase(mariadbRepository);
export const deleteInstitutionController = new DeleteInstitutionController(deleteInstitutionUseCase);