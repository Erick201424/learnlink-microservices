import { IsNotEmpty, IsString, IsIn, IsNumber } from "class-validator";

export class ValidatorCreateInstitution {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(["Preparatoria", "Universidad"])
    public educationLevel: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(["Trimestral", "Cuatrimestral", "Semestral"])
    public term: string;

    constructor(
        name: string,
        educationLevel: string,
        term: string
    ) {
        this.name = name;
        this.educationLevel = educationLevel;
        this.term = term;
    }
}

export class ValidatorUpdateInstitution {
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(["Preparatoria", "Universidad"])
    public educationLevel: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(["Trimestral", "Cuatrimestral", "Semestral"])
    public term: string;

    constructor(
        id: number,
        name: string,
        educationLevel: string,
        term: string
    ) {
        this.id = id;
        this.name = name;
        this.educationLevel = educationLevel;
        this.term = term;
    }
}

export class ValidatorGetByIdInstitution {
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    constructor(id: number) {
        this.id = id;
    }
}