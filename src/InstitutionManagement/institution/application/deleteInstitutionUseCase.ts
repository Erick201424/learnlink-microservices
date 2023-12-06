import { Institution } from "../domain/entities/institution";
import { InstitutionRepository } from "../domain/repositories/institutionRepository";
import { ValidatorGetByIdInstitution } from "../domain/validations/institutionValidation";
import { validate } from "class-validator";

export class DeleteInstitutionUseCase {
    constructor(readonly institutionRepository: InstitutionRepository) { }

    async execute(id: number): Promise<Institution | any | null> {
        const institution = new ValidatorGetByIdInstitution(id);
        const institutionValidation = await validate(institution);

        if (institutionValidation.length > 0) {
            throw new Error(JSON.stringify(institutionValidation));
        }

        try {
            const deleteInstitution = await this.institutionRepository.deleteInstitution(id);
            return deleteInstitution;
        } catch (error) {
            return null;
        }
    }
}