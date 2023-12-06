import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ValidatorCreateSubject {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsNumber()
    public iduser: number;

    constructor(
        name: string,
        iduser: number
    ) {
        this.name = name;
        this.iduser = iduser;
    }
}

export class ValidatorUpdateSubject {
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsNumber()
    public iduser: number;

    constructor(
        id: number,
        name: string,
        iduser: number
    ) {
        this.id = id;
        this.name = name;
        this.iduser = iduser;
    }
}

export class ValidatorGetByIdSubject {
    @IsNotEmpty()
    @IsNumber()
    public id: number;


    constructor(id: number) {
        this.id = id;
    }
}

export class ValidatorGetByStudentId {
    @IsNotEmpty()
    @IsNumber()
    public iduser: number;


    constructor(iduser: number) {
        this.iduser = iduser;
    }
}
