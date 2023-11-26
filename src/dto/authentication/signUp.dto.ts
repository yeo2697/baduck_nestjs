import { IsEmail, IsMobilePhone, IsNotEmpty, IsPhoneNumber, IsString, Max, Min } from "class-validator";

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    readonly userEmail :string;

    @IsString()
    @IsNotEmpty()
    readonly password :string;

    @IsString()
    @IsNotEmpty()
    readonly userName :string;

    @IsString()
    @IsNotEmpty()
    readonly userNickname :string;

    @IsMobilePhone("ko-KR")
    @IsNotEmpty()
    readonly mobilePhone :string;

    @IsString()
    @IsNotEmpty()
    readonly address :string;

    @Min(1900)
    @IsNotEmpty()
    readonly birthYear :number;

    @Min(1) @Max(12)
    @IsNotEmpty()
    readonly birthMonth :number;

    @Min(1) @Max(31)
    @IsNotEmpty()
    readonly birthDay :number;
}