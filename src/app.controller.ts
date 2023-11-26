import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dto/authentication/signIn.dto';
import { LocalAuthGuard } from './authentication/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    // private authenticationService :AuthenticationService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/sign-in')
  // async signIn(@Request() signInDto : SignInDto) {
  //   return this.authenticationService.validator(signInDto.userEmail, signInDto.password);
  // }
}
