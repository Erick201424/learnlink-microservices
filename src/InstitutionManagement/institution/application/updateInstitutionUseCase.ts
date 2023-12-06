import { Institution } from "../domain/entities/institution";
import { InstitutionRepository } from "../domain/repositories/institutionRepository";
import { ValidatorUpdateInstitution } from "../domain/validations/institutionValidation";
import { validate } from "class-validator";

export class UpdateInstitutionUseCase {
    constructor(readonly institutionRepository: InstitutionRepository) { }

    async execute(id: number, name: string, educationLevel: string, term: string): Promise<Institution | any | null> {
        const institution = new ValidatorUpdateInstitution(id, name, educationLevel, term);
        const institutionValidation = await validate(institution);

        if (institutionValidation.length > 0) {
            throw new Error(JSON.stringify(institutionValidation));
        }

        try {
            const updateInstitution = await this.institutionRepository.updateInstitution(
                id,
                name,
                educationLevel,
                term
            );

            return updateInstitution;
        } catch (error) {
            return null;
        }
    }
}