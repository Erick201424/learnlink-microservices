import { InstitutionCareerRelationship } from "../entities/institutionCareerRelationship";

export interface InstitutionCareerRelationshipRepository {

    createRelationship(institution_id: number, career_id: number): Promise<InstitutionCareerRelationship | null>;
    updateRelationship(id: number, institution_id: number, career_id: number): Promise<InstitutionCareerRelationship | null>;
    getCareersByInstitution(institution_id: number): Promise<string[] | null>;

    //Metodos de validación
    checkIfInstitutionExist(institution_id: number): Promise<boolean>;
    checkIfCareerExist(career_id: number): Promise<boolean>;
    checkIfRelationshipExist(institution_id: number, career_id: number): Promise<boolean>;
}