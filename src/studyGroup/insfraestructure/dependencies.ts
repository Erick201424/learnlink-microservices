import { MariaDBRepository } from "./repositories/mariadbRepository";

import { CreateCommunityUseCase } from "../application/createCommunityUseCase";
import { CreateCommunityController } from "./controllers/createCommunityController";

import { GetByIdCommunityUseCase } from "../application/getByIdCommunityUseCase";
import { GetByIdCommunityController } from "./controllers/getByIdCommunityController";

// import { GetByStudentIdUseCase } from "../application/getByStudentIdUseCase";
// import { GetByStudentIdController } from "./controllers/getByStudentIdController";

import { GetAllCommunitysUseCase } from "../application/getAllCommunitysUseCase";
import { GetAllCommunitysController } from "./controllers/getAllCommunitysController";

// import { UpdateCommunityUseCase } from "../application/updateCommunityUseCase";
// import { UpdateCommunityController } from "./controllers/updateCommunityController";

export const mariadbRepository = new MariaDBRepository();

export const createCommunityUseCase = new CreateCommunityUseCase(mariadbRepository);
export const createCommunityController = new CreateCommunityController(createCommunityUseCase);

export const getByIdCommunityUseCase = new GetByIdCommunityUseCase(mariadbRepository);
export const getByIdCommunityController = new GetByIdCommunityController(getByIdCommunityUseCase);

// export const getByStudentIdUseCase = new GetByStudentIdUseCase(mariadbRepository);
// export const getByStudentIdController = new GetByStudentIdController(getByStudentIdUseCase);

export const getAllCommunitysUseCase = new GetAllCommunitysUseCase(mariadbRepository);
export const getAllCommunitysController = new GetAllCommunitysController(getAllCommunitysUseCase);

// export const updateCommunityUseCase = new UpdateCommunityUseCase();
// export const updateCommunityController = new UpdateCommunityController();