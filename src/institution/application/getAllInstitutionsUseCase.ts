import { Institution } from "../domain/entities/institution";
import { InstitutionRepository } from "../domain/repositories/institutionRepository";

export class GetAllInstitutionsUseCase {
    constructor(readonly institutionRepository: InstitutionRepository) { }

    async execute(): Promise<Institution[] | any | null> {
        try {
            const listInstitutions = await this.institutionRepository.getAllInstituions();
            return listInstitutions;
        } catch (error) {
            return null;
        }
    }
}