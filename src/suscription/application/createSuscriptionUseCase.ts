import { Suscription } from "../domain/entities/suscription";
import { SuscriptionRepository } from "../domain/repositories/suscriptionRepository";
import { ValidatorCreateSuscription } from "../domain/validations/suscriptionValidation";
import { validate } from "class-validator";

export class CreateSuscriptionUseCase {
    constructor(readonly SuscriptionRepository: SuscriptionRepository) { }

    async execute(id_event: number,id_user: number): Promise<Suscription | null> {
        const suscription = new ValidatorCreateSuscription(id_event,id_user);
        const suscriptionValidation = await validate(suscription);

        if (suscriptionValidation.length > 0) {
            throw new Error(JSON.stringify(suscriptionValidation));
        }

        try {
            const createSuscription = await this.SuscriptionRepository.createSuscription(id_event,id_user);
            return createSuscription;
        } catch (error) {
            return null;
        }
    }
}