import { Career } from "../domain/entities/career";
import { CareerRepository } from "../domain/repositories/careerRepository";
import { ValidatorGetByIdCareer } from "../domain/validations/careerValidation";
import { validate } from "class-validator";

export class GetByIdCareerUseCase {
    constructor(readonly careerRepository: CareerRepository) { }

    async execute(id: number): Promise<Career | null> {
        const careerId = new ValidatorGetByIdCareer(id);
        const careerValidation = await validate(careerId);

        if (careerValidation.length > 0) {
            throw new Error(JSON.stringify(careerId));
        }

        try {
            const getCareer = await this.careerRepository.getByIdCareer(id);
            return getCareer;
        } catch (error) {
            return null;
        }
    }
}