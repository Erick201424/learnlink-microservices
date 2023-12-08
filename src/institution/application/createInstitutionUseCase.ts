import { Institution } from "../domain/entities/institution";
import { InstitutionRepository } from "../domain/repositories/institutionRepository";
import { ValidatorCreateInstitution } from "../domain/validations/institutionValidation";
import { validate } from "class-validator";

export class CreateInstitutionUseCase {
    constructor(readonly institutionRepository: InstitutionRepository) { }

    async execute(name: string, educationLevel: string, term: string): Promise<Institution | any | null> {
        const institution = new ValidatorCreateInstitution(name, educationLevel, term);
        const institutionValidation = await validate(institution);

        if (institutionValidation.length > 0) {
            throw new Error(JSON.stringify(institutionValidation));
        }

        try {
            const createInstitution = await this.institutionRepository.createInstitution(
                name,
                educationLevel,
                term
            );

            return createInstitution;
        } catch (error) {
            return null;
        }
    }
}