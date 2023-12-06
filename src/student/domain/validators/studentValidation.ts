import { Exclude } from "class-transformer";
import { IsEmail, IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from "class-validator";

export class ValidatorCreateStudent {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public lastname: string;

    @IsNotEmpty()
    @IsString()
    @Length(10)
    public phone: string;

    @IsNotEmpty()
    @IsIn(["Masculino", "Femenino", "Otro"])
    public gender: string;

    @IsNotEmpty()
    @IsEmail()
    @Matches(/^[^@]+@([a-zA-Z]+\.)?upchiapas\.edu\.mx$/, {
        message: 'El correo electrónico debe tener el dominio upchiapas.edu.mx',
    })
    public email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/, {
        message:
            "La contraseña debe tener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un carácter especial",
    })
    public password: string;

    @IsNotEmpty()
    public institution_id: number;

    @IsNotEmpty()
    public career_id: number;

    @IsNotEmpty()
    public securityQuestion: number;

    @IsNotEmpty()
    @IsString()
    public securityAnswer: string;

    constructor(
        name: string,
        lastname: string,
        phone: string,
        gender: string,
        email: string,
        password: string,
        institution_id: number,
        career_id: number,
        securityQuestion: number,
        securityAnswer: string,
    ) {
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.gender = gender;
        this.email = email;
        this.password = password;
        this.institution_id = institution_id;
        this.career_id = career_id;
        this.securityQuestion = securityQuestion;
        this.securityAnswer = securityAnswer;
    }
}

export class ValidatorUpdateStudent {
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    @IsOptional()
    @IsString()
    public name?: string;

    @IsOptional()
    @IsString()
    public lastname?: string;

    @IsOptional()
    @IsString()
    @Length(10)
    public phone?: string;

    @IsOptional()
    @IsIn(['Masculino', 'Femenino', 'Otro'])
    public gender?: string;

    constructor(
        id: number,
        name?: string,
        lastname?: string,
        phone?: string,
        gender?: string,
    ) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.gender = gender;
    }
}

export class ValidatorLoginStudent {
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export class ValidatorUpdatePassword {
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/, {
        message:
            "La contraseña debe tener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un carácter especial",
    })
    public password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export class ValidatorId {
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    constructor(id: number) {
        this.id = id;
    }
}

export class ValidatorEmail {
    @IsNotEmpty()
    @Matches(/^[^@]+@([a-zA-Z]+\.)+upchiapas.edu.mx$/, {
        message: 'El correo electrónico debe tener el dominio upchiapas.edu.mx',
    })
    public email: string;

    constructor(email: string) {
        this.email = email;
    }
}

export class ValidatorRecoveryPassword {
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsNumber()
    public securityQuestion: number;

    @IsNotEmpty()
    @IsString()
    public securityAnswer: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    constructor(email: string, securityQuestion: number, securityAnswer: string, password: string) {
        this.email = email;
        this.securityQuestion = securityQuestion;
        this.securityAnswer = securityAnswer;
        this.password = password;
    }
}

export class ValidatorGetById {
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    constructor(id: number) {
        this.id = id;
    }
}