import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class ValidatorCreateInstitutionCareerRelationship {
    @IsNotEmpty()
    @IsNumber({}, { message: 'El campo institution_id debe ser un número.' })
    public institution_id: number;

    @IsNotEmpty()
    @IsNumber({}, { message: 'El campo career_id debe ser un número.' })
    public career_id: number;

    constructor(institution_id: number, career_id: number) {
        this.institution_id = institution_id;
        this.career_id = career_id;
    }
}

export class ValidatorUpdateInstitutionCareerRelationship {
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    @IsNotEmpty()
    @IsNumber({}, { message: 'El campo institution_id debe ser un número.' })
    public institution_id: number;

    @IsNotEmpty()
    @IsNumber({}, { message: 'El campo career_id debe ser un número.' })
    public career_id: number;

    constructor(id: number, institution_id: number, career_id: number) {
        this.id = id;
        this.institution_id = institution_id;
        this.career_id = career_id;
    }
}

export class ValidatorGetByIdInstitution {
    @IsNotEmpty()
    @IsNumber()
    public institution_id: number;

    constructor(institution_id: number) {
        this.institution_id = institution_id;
    }
}