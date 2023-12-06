import { Event } from "../domain/entities/event";
import { EventRepository } from "../domain/repositories/eventRepository";
import { ValidatorGetByIdEvent } from "../domain/validations/eventValidation";
import { validate } from "class-validator";

export class GetByIdEventUseCase {
    constructor(readonly EventRepository: EventRepository) { }

    async execute(id: number): Promise<Event | null> {
        const EventId = new ValidatorGetByIdEvent(id);
        const EventValidation = await validate(EventId);

        if (EventValidation.length > 0) {
            throw new Error(JSON.stringify(EventId));
        }

        try {
            const getEvent = await this.EventRepository.getByIdEvent(id);
            return getEvent;
        } catch (error) {
            return null;
        }
    }
}