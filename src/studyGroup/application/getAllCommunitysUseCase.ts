import { Community } from "../domain/entities/community";
import { CommunityRepository } from "../domain/repositories/communityRepository";

export class GetAllCommunitysUseCase {
    constructor(readonly CommunityRepository: CommunityRepository) { }

    async execute(): Promise<Community[] | null> {
        try {
            const listCommunitys = await this.CommunityRepository.getAllCommunitys();
            return listCommunitys;
        } catch (error) {
            return null;
        }
    }
}