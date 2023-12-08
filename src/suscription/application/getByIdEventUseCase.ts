import { Suscription, SuscriptionWithUsers } from "../domain/entities/suscription";
import { SuscriptionRepository } from "../domain/repositories/suscriptionRepository";
import { ValidatorGetByIdEvent } from "../domain/validations/suscriptionValidation";
import { validate } from "class-validator";

export class GetByIdEventUseCase {
    constructor(readonly suscriptionRepository: SuscriptionRepository) { }

    async execute(id: number): Promise<SuscriptionWithUsers[] | any | null> {
        const suscriptionId = new ValidatorGetByIdEvent(id);
        const suscriptionValidation = await validate(suscriptionId);

        if (suscriptionValidation.length > 0) {
            throw new Error(JSON.stringify(suscriptionId));
        }

        try {
            const listSuscriptions = await this.suscriptionRepository.getByEventId(id);

            return listSuscriptions;

        } catch (error) {
            return null;
        }

    }
}