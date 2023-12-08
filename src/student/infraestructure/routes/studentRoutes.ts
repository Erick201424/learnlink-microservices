import expreess, { Router, Request, Response } from "express";
import {
    createStudentController,
    loginStudentController,
    updateStudentController,
    validateEmailIfExistController,
    updatePasswordByEmailController,
    getStudentByIdController,
    getAllStudentsController,
    getStudentsByEventController
} from "../dependencies";
import { validateToken, verifyToken } from "../../../helpers/token.helper";

export const studentRouter = Router();

studentRouter.get('/rutine', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutáda con éxito');
})

studentRouter.post('/', createStudentController.execute.bind(createStudentController));
studentRouter.post('/login', loginStudentController.execute.bind(loginStudentController));
studentRouter.post('/recovery', validateEmailIfExistController.execute.bind(validateEmailIfExistController));
studentRouter.post('/students/assitance', getStudentsByEventController.execute.bind(getStudentsByEventController));
studentRouter.put('/recovery/password', updatePasswordByEmailController.execute.bind(updatePasswordByEmailController));
studentRouter.put('/:id', validateToken, updateStudentController.execute.bind(updateStudentController));
studentRouter.get('/:id', getStudentByIdController.execute.bind(getStudentByIdController));
studentRouter.get('/list/students', validateToken, getAllStudentsController.execute.bind(getAllStudentsController));
