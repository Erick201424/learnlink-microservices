import { Schedule } from "../domain/entities/schedule";
import { ScheduleRepository } from "../domain/repositories/scheduleRepository";
import { ValidatorGetByIdSchedule } from "../domain/validations/scheduleValidation";
import { validate } from "class-validator";

export class GetByIdScheduleUseCase {
    constructor(readonly ScheduleRepository: ScheduleRepository) { }

    async execute(id: number): Promise<Schedule | null> {
        const ScheduleId = new ValidatorGetByIdSchedule(id);
        const ScheduleValidation = await validate(ScheduleId);

        if (ScheduleValidation.length > 0) {
            throw new Error(JSON.stringify(ScheduleId));
        }

        try {
            const getSchedule = await this.ScheduleRepository.getByIdSchedule(id);
            return getSchedule;
        } catch (error) {
            return null;
        }
    }
}