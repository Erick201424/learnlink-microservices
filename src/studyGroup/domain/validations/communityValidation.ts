import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ValidatorCreateCommunity {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public type: string;

    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsNotEmpty()
    @IsNumber()
    public iduser: number;

    constructor(
        type:string,
        name: string,
        description:string,
        iduser: number,


    ) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.iduser = iduser;



    }
}

// export class ValidatorUpdateCommunity {
//     @IsNotEmpty()
//     @IsNumber()
//     public id: number;

//     @IsNotEmpty()
//     @IsString()
//     public day: string;

//     @IsNotEmpty()
//     @IsNumber()
//     public iduser: number;

//     constructor(
//         id: number,
//         day: string,
//         iduser: number
//     ) {
//         this.id = id;
//         this.day = day;
//         this.iduser = iduser;
//     }
// }

export class ValidatorGetByIdCommunity {
    @IsNotEmpty()
    @IsNumber()
    public id: number;


    constructor(id: number) {
        this.id = id;
    }
}

// export class ValidatorGetByStudentId {
//     @IsNotEmpty()
//     @IsNumber()
//     public iduser: number;


//     constructor(iduser: number) {
//         this.iduser = iduser;
//     }
// }
