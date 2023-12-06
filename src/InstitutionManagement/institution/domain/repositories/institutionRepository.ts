import { Institution } from "../entities/institution";

export interface InstitutionRepository {

    createInstitution(
        name: string,
        educationLevel: string,
        term: string
    ): Promise<Institution | any | null>;

    updateInstitution(
        id: number,
        name: string,
        educationLevel: string,
        term: string
    ): Promise<Institution | any | null>;

    getInstitutionById(id: number): Promise<Institution | any | null>;

    getAllInstituions(): Promise<Institution[] | any | null>;

    deleteInstitution(id: number): Promise<Institution | any | null>;

}