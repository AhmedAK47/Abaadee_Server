import { IsString, Matches, MaxLength, MinLength,  } from "class-validator";


export class AuthDto{
    @IsString()
    @MinLength(8)
    @MaxLength(12)
    username:string;
    @IsString()
    @MinLength(8)
    @MaxLength(12)
    password:string;
}