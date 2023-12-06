import { MariaDBRepository } from "./repositories/mariadbRepository";

import { CreateEventUseCase } from "../application/createEventUseCase";
import { CreateEventController } from "./controllers/createEventController";

import { GetByIdEventUseCase } from "../application/getByIdEventUseCase";
import { GetByIdEventController } from "./controllers/getByIdEventController";

import { GetByCommunityIdUseCase } from "../application/getByCommunityIdUseCase";
import { GetByCommunityIdController } from "./controllers/getByCommunityIdController";

import { GetAllEventsUseCase } from "../application/getAllEventsUseCase";
import { GetAllEventsController } from "./controllers/getAllEventsController";

import { CancelEventUseCase } from "../application/cancelEventUseCase";
import { CancelEventController } from "./controllers/cancelEventController";

export const mariadbRepository = new MariaDBRepository();

export const createEventUseCase = new CreateEventUseCase(mariadbRepository);
export const createEventController = new CreateEventController(createEventUseCase);

export const getByIdEventUseCase = new GetByIdEventUseCase(mariadbRepository);
export const getByIdEventController = new GetByIdEventController(getByIdEventUseCase);

export const getByCommunityIdUseCase = new GetByCommunityIdUseCase(mariadbRepository);
export const getByCommunityIdController = new GetByCommunityIdController(getByCommunityIdUseCase);

export const getAllEventsUseCase = new GetAllEventsUseCase(mariadbRepository);
export const getAllEventsController = new GetAllEventsController(getAllEventsUseCase);

export const cancelEventUseCase = new CancelEventUseCase(mariadbRepository);
export const cancelEventController = new CancelEventController(cancelEventUseCase);