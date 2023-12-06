import { Schedule } from "../domain/entities/schedule";
import { ScheduleRepository } from "../domain/repositories/scheduleRepository";

export class GetAllSchedulesUseCase {
    constructor(readonly ScheduleRepository: ScheduleRepository) { }

    async execute(): Promise<Schedule[] | null> {
        try {
            const listSchedules = await this.ScheduleRepository.getAllSchedules();
            return listSchedules;
        } catch (error) {
            return null;
        }
    }
}