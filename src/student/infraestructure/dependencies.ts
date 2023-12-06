import { MariaDBRepository } from "./repositories/mariadbRepository";

import { CreateStudentUseCase } from "../application/createStudentUseCase";
import { CreateStudentController } from "./controller/createStudentController";

import { LoginStudentUseCase } from "../application/loginStudentUseCase";
import { LoginStudentController } from "./controller/loginStudentController";

import { ValidateEmailUseCase } from "../application/validateEmailIfExistsUseCase";
import { ValidateEmailController } from "./controller/validateEmailIfExistController";

import { UpdateStudentUseCase } from "../application/updateStudentUseCase";
import { UpdateStudentController } from "./controller/updateStudentController";

import { UpdatePasswordByEmailUseCase } from "../application/updatePasswordByEmailUseCase";
import { UpdatePasswordByEmailController } from "./controller/updatePasswordByEmailController";

import { GetStudentByIdUseCase } from "../application/getStudentByIdUseCase";
import { GetStudentByIdController } from "./controller/getStudentByIdController";

import { GetAllStudentsUseCase } from "../application/getAllStudentsUseCase";
import { GetAllStudentsController } from "./controller/getAllStudentsController";

export const mariadbRepository = new MariaDBRepository();

export const createStudentUseCase = new CreateStudentUseCase(mariadbRepository);
export const createStudentController = new CreateStudentController(createStudentUseCase);

export const loginStudentUseCase = new LoginStudentUseCase(mariadbRepository);
export const loginStudentController = new LoginStudentController(loginStudentUseCase);

export const validateEmailIfExistsUseCase = new ValidateEmailUseCase(mariadbRepository);
export const validateEmailIfExistController = new ValidateEmailController(validateEmailIfExistsUseCase);

export const updateStudentUseCase = new UpdateStudentUseCase(mariadbRepository);
export const updateStudentController = new UpdateStudentController(updateStudentUseCase);

export const updatePasswordByEmailUseCase = new UpdatePasswordByEmailUseCase(mariadbRepository);
export const updatePasswordByEmailController = new UpdatePasswordByEmailController(updatePasswordByEmailUseCase);

export const getStudentByIdUseCase = new GetStudentByIdUseCase(mariadbRepository);
export const getStudentByIdController = new GetStudentByIdController(getStudentByIdUseCase);

export const getAllStudentsUseCase = new GetAllStudentsUseCase(mariadbRepository);
export const getAllStudentsController = new GetAllStudentsController(getAllStudentsUseCase);