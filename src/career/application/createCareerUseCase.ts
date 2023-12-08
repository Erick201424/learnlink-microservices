import { Career } from "../domain/entities/career";
import { CareerRepository } from "../domain/repositories/careerRepository";
import { ValidatorCreateCareer } from "../domain/validations/careerValidation";
import { validate } from "class-validator";

export class CreateCareerUseCase {
    constructor(readonly careerRepository: CareerRepository) { }

    async execute(name: string): Promise<Career | null> {
        const career = new ValidatorCreateCareer(name);
        const careerValidation = await validate(career);

        if (careerValidation.length > 0) {
            throw new Error(JSON.stringify(careerValidation));
        }

        try {
            const createCareer = await this.careerRepository.createCareer(name);
            return createCareer;
        } catch (error) {
            return null;
        }
    }
}