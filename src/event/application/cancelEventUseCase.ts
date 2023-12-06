import { Event } from "../domain/entities/event";
import { EventRepository } from "../domain/repositories/eventRepository";
import { ValidatorCancelEvent } from "../domain/validations/eventValidation";
import { validate } from "class-validator";

export class CancelEventUseCase {
    constructor(readonly EventRepository: EventRepository) { }

    async execute(id: number,status:string): Promise<Event | null> {
        const Event = new ValidatorCancelEvent(id,status);
        const EventValidation = await validate(Event);

        if (EventValidation.length > 0) {
            throw new Error(JSON.stringify(EventValidation));
        }

        try {
            const cancelEvent = await this.EventRepository.cancelEvent(id, status);
            return cancelEvent;
        } catch (error) {
            return null;
        }
    }


}