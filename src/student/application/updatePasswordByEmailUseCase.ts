import { Student } from "../domain/entities/student";
import { StudentRepository } from "../domain/repositories/studentRepository";
import { ValidatorUpdatePassword } from "../domain/validators/studentValidation";
import { validate } from "class-validator";

export class UpdatePasswordByEmailUseCase {
    constructor(readonly studentReposiitory: StudentRepository) { }

    async execute(email: string, password: string): Promise<Student | null> {
        const updatePasswordValidator = new ValidatorUpdatePassword(email, password);
        const updatePasswordValidate = await validate(updatePasswordValidator);

        if (updatePasswordValidate.length > 0) {
            throw new Error(JSON.stringify(updatePasswordValidate));
        }

        try {
            const updatedPasswordStudent = await this.studentReposiitory.updatePasswordByEmail(email, password);
            return updatedPasswordStudent;
        } catch (error) {
            return null;
        }
    }
}