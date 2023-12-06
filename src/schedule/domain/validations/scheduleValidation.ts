import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ValidatorCreateSchedule {
    @IsNotEmpty()
    @IsString()
    public day: string;

    @IsNotEmpty()
    @IsNumber()
    public iduser: number;

    constructor(
        day: string,
        iduser: number
    ) {
        this.day = day;
        this.iduser = iduser;
    }
}

export class ValidatorUpdateSchedule {
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    @IsNotEmpty()
    @IsString()
    public day: string;

    @IsNotEmpty()
    @IsNumber()
    public iduser: number;

    constructor(
        id: number,
        day: string,
        iduser: number
    ) {
        this.id = id;
        this.day = day;
        this.iduser = iduser;
    }
}

export class ValidatorGetByIdSchedule {
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
