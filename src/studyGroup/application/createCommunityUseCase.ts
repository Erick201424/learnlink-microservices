import { Community } from "../domain/entities/community";
import { CommunityRepository } from "../domain/repositories/communityRepository";
import { ValidatorCreateCommunity } from "../domain/validations/communityValidation";
import { validate } from "class-validator";

export class CreateCommunityUseCase {
    constructor(readonly CommunityRepository: CommunityRepository) { }

    async execute(type: string,name: string,description: string,idsubject:number): Promise<Community | null> {
        const Community = new ValidatorCreateCommunity(type,name,description,idsubject);
        const CommunityValidation = await validate(Community);

        if (CommunityValidation.length > 0) {
            throw new Error(JSON.stringify(CommunityValidation));
        }

        try {
            const createCommunity = await this.CommunityRepository.createCommunity(type,name,description,idsubject);
            return createCommunity;
        } catch (error) {
            return null;
        }
    }
}