import { Schedule } from "../domain/entities/schedule";
import { ScheduleRepository } from "../domain/repositories/scheduleRepository";
import { ValidatorCreateSchedule } from "../domain/validations/scheduleValidation";
import { validate } from "class-validator";

export class CreateScheduleUseCase {
    constructor(readonly ScheduleRepository: ScheduleRepository) { }

    async execute(day: string,start_at: string,end_at: string,idsubject:number,iduser:number): Promise<Schedule | null> {
        const Schedule = new ValidatorCreateSchedule(day,iduser);
        const ScheduleValidation = await validate(Schedule);

        if (ScheduleValidation.length > 0) {
            throw new Error(JSON.stringify(ScheduleValidation));
        }

        try {
            const createSchedule = await this.ScheduleRepository.createSchedule(day,start_at,end_at,idsubject,iduser);
            return createSchedule;
        } catch (error) {
            return null;
        }
    }
}