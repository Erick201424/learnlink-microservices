import { MariaDBRepository } from "./repositories/mariadbRepository";

import { CreateScheduleUseCase } from "../application/createScheduleUseCase";
import { CreateScheduleController } from "./controllers/createSubjectController";

import { GetByIdScheduleUseCase } from "../application/getByIdScheduleUseCase";
import { GetByIdScheduleController } from "./controllers/getByIdSubjectController";

import { GetByStudentIdUseCase } from "../application/getByStudentIdUseCase";
import { GetByStudentIdController } from "./controllers/getByStudentIdController";

import { GetAllSchedulesUseCase } from "../application/getAllSchedulesUseCase";
import { GetAllSchedulesController } from "./controllers/getAllSubjectsController";

import { UpdateScheduleUseCase } from "../application/updateSubjectUseCase";
import { UpdateScheduleController } from "./controllers/updateSubjectController";

export const mariadbRepository = new MariaDBRepository();

export const createSubjectUseCase = new CreateScheduleUseCase(mariadbRepository);
export const createSubjectController = new CreateScheduleController(createSubjectUseCase);

export const getByIdSubjectUseCase = new GetByIdScheduleUseCase(mariadbRepository);
export const getByIdSubjectController = new GetByIdScheduleController(getByIdSubjectUseCase);

export const getByStudentIdUseCase = new GetByStudentIdUseCase(mariadbRepository);
export const getByStudentIdController = new GetByStudentIdController(getByStudentIdUseCase);

export const getAllSubjectsUseCase = new GetAllSchedulesUseCase(mariadbRepository);
export const getAllSubjectsController = new GetAllSchedulesController(getAllSubjectsUseCase);

export const updateSubjectUseCase = new UpdateScheduleUseCase();
export const updateSubjectController = new UpdateScheduleController();