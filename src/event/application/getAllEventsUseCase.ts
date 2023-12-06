import { Event } from "../domain/entities/event";
import { EventRepository } from "../domain/repositories/eventRepository";

export class GetAllEventsUseCase {
    constructor(readonly EventRepository: EventRepository) { }

    async execute(): Promise<Event[] | null> {
        try {
            const listEvents = await this.EventRepository.getAllEvents();
            return listEvents;
        } catch (error) {
            return null;
        }
    }
}