import { MariaDBRepository } from "./repositories/mariadbRepository";

import { CreateCareerUseCase } from "../application/createCareerUseCase";
import { CreateCareerController } from "./controllers/createCareerController";

import { GetByIdCareerUseCase } from "../application/getByIdCareerUseCase";
import { GetByIdCareerController } from "./controllers/getByIdCareerController";

import { GetAllCareersUseCase } from "../application/getAllCareersUseCase";
import { GetAllCareersController } from "./controllers/getAllCareersController";

import { UpdateCareerUseCase } from "../application/updateCareerUseCase";
import { UpdateCareerController } from "./controllers/updateCareerController";

export const mariadbRepository = new MariaDBRepository();

export const createCareerUseCase = new CreateCareerUseCase(mariadbRepository);
export const createCareerController = new CreateCareerController(createCareerUseCase);

export const getByIdCareerUseCase = new GetByIdCareerUseCase(mariadbRepository);
export const getByIdCareerController = new GetByIdCareerController(getByIdCareerUseCase);

export const getAllCareersUseCase = new GetAllCareersUseCase(mariadbRepository);
export const getAllCareersController = new GetAllCareersController(getAllCareersUseCase);

export const updateCareerUseCase = new UpdateCareerUseCase(mariadbRepository);
export const updateCareerController = new UpdateCareerController(updateCareerUseCase);