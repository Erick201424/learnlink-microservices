import { InstitutionCareerRelationship } from "../domain/entities/institutionCareerRelationship";
import { InstitutionCareerRelationshipRepository } from "../domain/repositories/institutionCareerRelationshipRepository";
import { ValidatorGetByIdInstitution } from "../domain/validations/institutionCareerRelationshipValidation";
import { validate } from "class-validator";

export class GetCareersByInstitutionUseCase {
    constructor(readonly relationRepository: InstitutionCareerRelationshipRepository) { }

    async execute(institution_id: number): Promise<string[] | null> {
        const institutionId = new ValidatorGetByIdInstitution(institution_id);
        const institutionValidation = await validate(institutionId);

        if (institutionValidation.length > 0) {
            throw new Error(JSON.stringify(institutionValidation));
        }

        // Verificar si la institución existe
        const institutionExist = await this.relationRepository.checkIfInstitutionExist(institution_id);
        if (!institutionExist) {
            console.log(`La institución con el ID ${institution_id} proporcionado no existe`);
            throw new Error(`La institución con el ID ${institution_id} proporcionado no existe`);
        } else {
            try {
                const listCareers = await this.relationRepository.getCareersByInstitution(institution_id);
                return listCareers;
            } catch (error) {
                console.error(error);
                throw new Error('Error al obtener las carreras asociadas a la institución');
            }
        }
    }
}
