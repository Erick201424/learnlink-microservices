// import { Schedule } from "../domain/entities/community";
// import { ScheduleRepository } from "../domain/repositories/communityRepository";
// import { ValidatorGetByIdSchedule, ValidatorGetByStudentId } from "../domain/validations/communityValidation";
// import { validate } from "class-validator";

// export class GetByStudentIdUseCase {
//     constructor(readonly ScheduleRepository: ScheduleRepository) { }

//     async execute(iduser: number): Promise<Schedule[] | null> {
//         const ScheduleId = new ValidatorGetByStudentId(iduser);
//         const ScheduleValidation = await validate(ScheduleId);

//         if (ScheduleValidation.length > 0) {
//             throw new Error(JSON.stringify(ScheduleId));
//         }

//         try {
//             const getSchedule = await this.ScheduleRepository.getByStudentId(iduser);
//             return getSchedule;
//         } catch (error) {
//             return null;
//         }
//     }
// }