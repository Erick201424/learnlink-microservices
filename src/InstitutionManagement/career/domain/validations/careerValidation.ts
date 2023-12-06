import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ValidatorCreateCareer {
    @IsNotEmpty()
    @IsString()
    public name: string;

    constructor(
        name: string
    ) {
        this.name = name;
    }
}

export class ValidatorUpdateCareer {
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    @IsNotEmpty()
    @IsString()
    public name: string;

    constructor(
        id: number,
        name: string
    ) {
        this.id = id;
        this.name = name;
    }
}

export class ValidatorGetByIdCareer {
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    constructor(id: number) {
        this.id = id;
    }
}