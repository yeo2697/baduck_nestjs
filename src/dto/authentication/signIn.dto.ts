import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    readonly userEmail :string;

    @IsNotEmpty()
    @IsString()
    readonly password :string;
}