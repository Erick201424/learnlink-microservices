import { Career } from "../domain/entities/career";
import { CareerRepository } from "../domain/repositories/careerRepository";
import { ValidatorUpdateCareer } from "../domain/validations/careerValidation";
import { validate } from "class-validator";

export class UpdateCareerUseCase {
    constructor(readonly careerRepository: CareerRepository) { }

    async execute(id: number, name: string): Promise<Career | null> {
        const career = new ValidatorUpdateCareer(id, name);
        const careerValidation = await validate(career);

        if (careerValidation.length > 0) {
            throw new Error(JSON.stringify(careerValidation));
        }

        try {
            const updateCareer = await this.careerRepository.updateCareer(id, name);
            return updateCareer;
        } catch (error) {
            return null;
        }
    }


}