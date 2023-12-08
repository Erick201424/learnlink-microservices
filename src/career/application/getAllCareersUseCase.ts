import { Career } from "../domain/entities/career";
import { CareerRepository } from "../domain/repositories/careerRepository";

export class GetAllCareersUseCase {
    constructor(readonly careerRepository: CareerRepository) { }

    async execute(): Promise<Career[] | null> {
        try {
            const listCareers = await this.careerRepository.getAllCareers();
            return listCareers;
        } catch (error) {
            return null;
        }
    }
}