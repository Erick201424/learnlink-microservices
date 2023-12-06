import { MariaDBRepository } from "./repositories/mariadbRepository";

import { CreateSubjectUseCase } from "../application/createSubjectUseCase";
import { CreateSubjectController } from "./controllers/createSubjectController";

import { GetByIdSubjectUseCase } from "../application/getByIdSubjectUseCase";
import { GetByIdSubjectController } from "./controllers/getByIdSubjectController";

import { GetByStudentIdUseCase } from "../application/getByStudentIdUseCase";
import { GetByStudentIdController } from "./controllers/getByStudentIdController";

import { GetAllSubjectsUseCase } from "../application/getAllSubjectsUseCase";
import { GetAllSubjectsController } from "./controllers/getAllSubjectsController";

import { UpdateSubjectUseCase } from "../application/updateSubjectUseCase";
import { UpdateSubjectController } from "./controllers/updateSubjectController";

export const mariadbRepository = new MariaDBRepository();

export const createSubjectUseCase = new CreateSubjectUseCase(mariadbRepository);
export const createSubjectController = new CreateSubjectController(createSubjectUseCase);

export const getByIdSubjectUseCase = new GetByIdSubjectUseCase(mariadbRepository);
export const getByIdSubjectController = new GetByIdSubjectController(getByIdSubjectUseCase);

export const getByStudentIdUseCase = new GetByStudentIdUseCase(mariadbRepository);
export const getByStudentIdController = new GetByStudentIdController(getByStudentIdUseCase);

export const getAllSubjectsUseCase = new GetAllSubjectsUseCase(mariadbRepository);
export const getAllSubjectsController = new GetAllSubjectsController(getAllSubjectsUseCase);

export const updateSubjectUseCase = new UpdateSubjectUseCase(mariadbRepository);
export const updateSubjectController = new UpdateSubjectController(updateSubjectUseCase);