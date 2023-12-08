import { Institution } from "../domain/entities/institution";
import { InstitutionRepository } from "../domain/repositories/institutionRepository";
import { ValidatorGetByIdInstitution } from "../domain/validations/institutionValidation";
import { validate } from "class-validator";

export class GetByIdInstitutionUseCase {
    constructor(readonly institutionRepository: InstitutionRepository) { }

    async execute(id: number): Promise<Institution | any | null> {
        const institutionId = new ValidatorGetByIdInstitution(id);
        const institutionValidation = await validate(institutionId);

        if (institutionValidation.length > 0) {
            throw new Error(JSON.stringify(institutionValidation));
        }

        try {
            const getInstitution = await this.institutionRepository.getInstitutionById(id);
            return getInstitution;
        } catch (error) {
            return null;
        }
    }
}