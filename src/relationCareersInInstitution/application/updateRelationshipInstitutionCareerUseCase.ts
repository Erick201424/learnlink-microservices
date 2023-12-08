import { InstitutionCareerRelationship } from "../domain/entities/institutionCareerRelationship";
import { InstitutionCareerRelationshipRepository } from "../domain/repositories/institutionCareerRelationshipRepository";
import { ValidatorUpdateInstitutionCareerRelationship } from "../domain/validations/institutionCareerRelationshipValidation";
import { validate } from "class-validator";

export class UpdateInstitutionCareerRelationshipUseCase {
    constructor(readonly relationRepository: InstitutionCareerRelationshipRepository) { }

    async execute(id: number, institution_id: number, career_id: number): Promise<InstitutionCareerRelationship | null> {
        const relation = new ValidatorUpdateInstitutionCareerRelationship(id, institution_id, career_id);
        const relationValidation = await validate(relation);

        if (relationValidation.length > 0) {
            throw new Error(JSON.stringify(relationValidation));
        }

        // Verificar si la institución existe
        const institutionExist = await this.relationRepository.checkIfInstitutionExist(institution_id);
        if (!institutionExist) {
            console.log(`La institución con el ID ${institution_id} proporcionado no existe`);
            throw new Error(`La institución con el ID ${institution_id} proporcionado no existe`);
        }

        // Verificar si la carrera existe
        const careerExist = await this.relationRepository.checkIfCareerExist(career_id);
        if (!careerExist) {
            console.log(`La carrera con el ID ${career_id} proporcionado no existe`);
            throw new Error(`La carrera con el ID ${career_id} proporcionado no existe`);
        }

        // Verificar si la relación entre Institución y Carrera existe
        const relationshipExist = await this.relationRepository.checkIfRelationshipExist(institution_id, career_id);
        if (!relationshipExist) {
            try {
                const updatedRelationship = await this.relationRepository.updateRelationship(id, institution_id, career_id);
                return updatedRelationship;
            } catch (error) {
                console.error(error);
                throw new Error('Error al actualizar la relación entre institución y carrera');
            }
        } else {
            console.log(`La relación entre la institución ${institution_id} y la carrera ${career_id} ya existe, por lo tanto no se actualizo`);
            throw new Error(`La relación entre la institución ${institution_id} y la carrera ${career_id} ya existe, por lo tanto no se actualizo`);
        }
    }
}