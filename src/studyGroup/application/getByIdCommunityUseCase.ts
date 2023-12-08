import { Community, CommunityWithStudent } from "../domain/entities/community";
import { CommunityRepository } from "../domain/repositories/communityRepository";
import { ValidatorGetByIdCommunity } from "../domain/validations/communityValidation";
import { validate } from "class-validator";

export class GetByIdCommunityUseCase {
    constructor(readonly CommunityRepository: CommunityRepository) { }

    async execute(id: number): Promise<Community | null> {
        const CommunityId = new ValidatorGetByIdCommunity(id);
        const CommunityValidation = await validate(CommunityId);

        if (CommunityValidation.length > 0) {
            throw new Error(JSON.stringify(CommunityId));
        }

        try {
            // Obtener datos de la comunidad desde el repositorio
            const getCommunity = await this.CommunityRepository.getByIdCommunity(id);

            return getCommunity;
        } catch (error) {
            return null;
        }
    }
}