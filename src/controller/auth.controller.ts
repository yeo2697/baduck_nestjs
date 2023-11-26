import { Body, Controller, HttpStatus, Post, Res, ValidationPipe } from "@nestjs/common";
import { AuthService } from "src/service/auth.service";
import { SignInDto } from "src/dto/authentication/signIn.dto";
import { SignUpDto } from "src/dto/authentication/signUp.dto";
import { User } from "src/entity/user.entity";
import { TokenDto } from "src/dto/authentication/token.dto";
import { Response } from "express";

@Controller('auth')
export class AuthController {
    constructor(
        private authService :AuthService
    ) {}

    @Post('/sign-up')
    async signUp(
        @Body(ValidationPipe) signUpDto :SignUpDto,
        @Res() res: Response
    ): Promise<void> {
        await this.authService.signup(signUpDto);
        
        res.status(HttpStatus.CREATED).send();
    }

    @Post('/sign-in')
    async signIn(
        @Body(ValidationPipe) signInDto: SignInDto
    ): Promise<TokenDto> {
        return await this.authService.validator(signInDto.userEmail, signInDto.password);
    }
}