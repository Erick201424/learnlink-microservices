import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ValidatorCreateSuscription {
    @IsNotEmpty()
    @IsNumber()
    public id_event: number;

    @IsNotEmpty()
    @IsNumber()
    public id_user: number;
    
    constructor(
        id_event: number,
        id_user: number,

    ) {
        this.id_event = id_event;
        this.id_user = id_user;  
    }
}

// export class ValidatorUpdateEvent {
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

export class ValidatorGetByIdEvent {
    @IsNotEmpty()
    @IsNumber()
    public id_event: number;


    constructor(id_event: number) {
        this.id_event = id_event;
    }
}

export class ValidatorGetByuserId {
    @IsNotEmpty()
    @IsNumber()
    public id_user: number;


    constructor(id_user: number) {
        this.id_user = id_user;
    }
}
