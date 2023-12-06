import { Event } from "../domain/entities/event";
import { EventRepository } from "../domain/repositories/eventRepository";
import { ValidatorCreateEvent } from "../domain/validations/eventValidation";
import { validate } from "class-validator";

export class CreateEventUseCase {
    constructor(readonly EventRepository: EventRepository) { }

    async execute(description: string,id_community: number,location: string,date:string,starts_at:string,status:string): Promise<Event | null> {
        const Event = new ValidatorCreateEvent(description,id_community,location,date,starts_at);
        const EventValidation = await validate(Event);

        if (EventValidation.length > 0) {
            throw new Error(JSON.stringify(EventValidation));
        }

        try {
            const createEvent = await this.EventRepository.createEvent(description,id_community,location,date,starts_at,status);
            return createEvent;
        } catch (error) {
            return null;
        }
    }
}