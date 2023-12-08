import { InstitutionCareerRelationship } from "../domain/entities/institutionCareerRelationship";
import { InstitutionCareerRelationshipRepository } from "../domain/repositories/institutionCareerRelationshipRepository";
import { ValidatorCreateInstitutionCareerRelationship } from "../domain/validations/institutionCareerRelationshipValidation";
import { validate } from "class-validator";

export class CreateInstitutionCareerRelationshipUseCase {
    constructor(readonly relationRepository: InstitutionCareerRelationshipRepository) { }

    async execute(institution_id: number, career_id: number): Promise<InstitutionCareerRelationship | null> {
        const relation = new ValidatorCreateInstitutionCareerRelationship(institution_id, career_id);
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
        if (relationshipExist) {
            console.log(`La relación entre la institución ${institution_id} y la carrera ${career_id} ya existe`);
            throw new Error(`La relación entre la institución ${institution_id} y la carrera ${career_id} ya existe`);
        }

        // Si ambas existen, proceder con la creación de la relación
        try {
            const createdRelationship = await this.relationRepository.createRelationship(institution_id, career_id);
            return createdRelationship;
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear la relación entre institución y carrera');
        }
    }
}