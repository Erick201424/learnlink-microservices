import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ValidatorCreateEvent {
    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsNotEmpty()
    @IsNumber()
    public id_community: number;

    @IsNotEmpty()
    @IsString()
    public location: string;

    @IsNotEmpty()
    @IsString()
    public date: string;

    @IsNotEmpty()
    @IsString()
    public starts_at: string;

    constructor(
        description:string,
        id_community: number,
        location:string,
        date: string,
        starts_at: string


    ) {
        this.description = description;
        this.id_community = id_community;
        this.location = location;
        this.date = date;
        this.starts_at = starts_at;



    }
}

export class ValidatorCancelEvent {
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    @IsNotEmpty()
    @IsString()
    public status: string;


    constructor(
        id: number,
        status: string,
    ) {
        this.id = id;
        this.status = status;
    }
}

export class ValidatorGetByIdEvent {
    @IsNotEmpty()
    @IsNumber()
    public id: number;


    constructor(id: number) {
        this.id = id;
    }
}

export class ValidatorGetByCommunityId {
    @IsNotEmpty()
    @IsNumber()
    public id_community: number;


    constructor(id_community: number) {
        this.id_community = id_community;
    }
}
