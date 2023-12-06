// import { Event } from "../domain/entities/suscription";
// import { EventRepository } from "../domain/repositories/suscriptionRepository";

// export class GetAllEventsUseCase {
//     constructor(readonly EventRepository: EventRepository) { }

//     async execute(): Promise<Event[] | null> {
//         try {
//             const listEvents = await this.EventRepository.getAllEvents();
//             return listEvents;
//         } catch (error) {
//             return null;
//         }
//     }
// }