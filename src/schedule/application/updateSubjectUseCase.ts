import { Schedule } from "../domain/entities/schedule";
import { ScheduleRepository } from "../domain/repositories/scheduleRepository";
import { ValidatorUpdateSchedule } from "../domain/validations/scheduleValidation";
import { validate } from "class-validator";

export class UpdateScheduleUseCase {
    // constructor(readonly ScheduleRepository: ScheduleRepository) { }

    // async execute(id: number, name: string,iduser:number): Promise<Schedule | null> {
    //     const Schedule = new ValidatorUpdateSchedule(id, name,iduser);
    //     const ScheduleValidation = await validate(Schedule);

    //     if (ScheduleValidation.length > 0) {
    //         throw new Error(JSON.stringify(ScheduleValidation));
    //     }

    //     try {
    //         const updateSchedule = await this.ScheduleRepository.updateSchedule(id, name,iduser);
    //         return updateSchedule;
    //     } catch (error) {
    //         return null;
    //     }
    // }


}