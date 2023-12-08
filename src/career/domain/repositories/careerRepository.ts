import { Career } from "../entities/career";

export interface CareerRepository {

    createCareer(name: string): Promise<Career | null>;
    updateCareer(id: number, name: string): Promise<Career | null>;
    getByIdCareer(id: number): Promise<Career | null>;
    getAllCareers(): Promise<Career[] | null>

}