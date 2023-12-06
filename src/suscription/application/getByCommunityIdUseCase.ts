// import { Suscription } from "../domain/entities/suscription";
// import { SuscriptionRepository } from "../domain/repositories/suscriptionRepository";
// import { ValidatorGetByCommunityId } from "../domain/validations/suscriptionValidation";
// import { validate } from "class-validator";

// export class GetByCommunityIdUseCase {
//     constructor(readonly suscriptionRepository: SuscriptionRepository) { }

//     async execute(id_community: number): Promise<Event[] | null> {
//         const communityId = new ValidatorGetByCommunityId(id_community);
//         const communityIdValidation = await validate(communityId);

//         if (communityIdValidation.length > 0) {
//             throw new Error(JSON.stringify(communityId));
//         }

//         try {
//             const getCommunity = await this.suscriptionRepository.getByCommunityId(id_community);
//             return getCommunity;
//         } catch (error) {
//             return null;
//         }
//     }
// }