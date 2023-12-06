import { Event } from "../domain/entities/event";
import { EventRepository } from "../domain/repositories/eventRepository";
import { ValidatorGetByCommunityId } from "../domain/validations/eventValidation";
import { validate } from "class-validator";

export class GetByCommunityIdUseCase {
    constructor(readonly eventRepository: EventRepository) { }

    async execute(id_community: number): Promise<Event[] | null> {
        const communityId = new ValidatorGetByCommunityId(id_community);
        const communityIdValidation = await validate(communityId);

        if (communityIdValidation.length > 0) {
            throw new Error(JSON.stringify(communityId));
        }

        try {
            const getCommunity = await this.eventRepository.getByCommunityId(id_community);
            return getCommunity;
        } catch (error) {
            return null;
        }
    }
}