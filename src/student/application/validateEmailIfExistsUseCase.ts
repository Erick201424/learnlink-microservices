import { securityInformation } from "../domain/entities/student";
import { StudentRepository } from "../domain/repositories/studentRepository";
import { ValidatorEmail } from "../domain/validators/studentValidation";
import { validate } from "class-validator";

export class ValidateEmailUseCase {
    constructor(readonly studentRepository: StudentRepository) { }

    async execute(email: string): Promise<securityInformation | null> {
        const emailValidator = new ValidatorEmail(email);
        const emailValidate = await validate(emailValidator);

        if (emailValidate.length > 0) {
            throw new Error(JSON.stringify(emailValidate));
        }

        try {
            const emailExist = await this.studentRepository.validateEmailIfExist(email);
            return emailExist;
        } catch (error) {
            console.error('Error during login use case:', error);
            return null;
        }
    }
}