import { MariaDBRepository } from "./repositories/mariadbRepository";

import { CreateSuscriptionUseCase } from "../application/createSuscriptionUseCase";
import { CreateSuscriptionController } from "./controllers/createSuscriptionController";

// import { GetByIdSuscriptionUseCase } from "../application/getByIdSuscriptionUseCase";
// import { GetByIdSuscriptionController } from "./controllers/getByIdSuscriptionController";

import { GetByIdEventUseCase } from "../application/getByIdEventUseCase";
import { GetByIdEventController } from "./controllers/getByIdEventController";

// import { GetAllSuscriptionsUseCase } from "../application/getAllSuscriptionsUseCase";
// import { GetAllSuscriptionsController } from "./controllers/getAllSuscriptionsController";

// import { UpdateSuscriptionUseCase } from "../application/updateSuscriptionUseCase";
// import { UpdateSuscriptionController } from "./controllers/updateSuscriptionController";

export const mariadbRepository = new MariaDBRepository();

export const createSuscriptionUseCase = new CreateSuscriptionUseCase(mariadbRepository);
export const createSuscriptionController = new CreateSuscriptionController(createSuscriptionUseCase);

// export const getByIdSuscriptionUseCase = new GetByIdSuscriptionUseCase(mariadbRepository);
// export const getByIdSuscriptionController = new GetByIdSuscriptionController(getByIdSuscriptionUseCase);

export const getByEventIdUseCase = new GetByIdEventUseCase(mariadbRepository);
export const getByEventIdController = new GetByIdEventController(getByEventIdUseCase);

// export const getAllSuscriptionsUseCase = new GetAllSuscriptionsUseCase(mariadbRepository);
// export const getAllSuscriptionsController = new GetAllSuscriptionsController(getAllSuscriptionsUseCase);

// export const updateSuscriptionUseCase = new UpdateSuscriptionUseCase();
// export const updateSuscriptionController = new UpdateSuscriptionController();