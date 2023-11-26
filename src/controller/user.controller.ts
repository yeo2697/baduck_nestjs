import { Controller, Get, HttpStatus, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { JwtAuthGuard } from "src/authentication/jwt-auth.guard";
import { GetUser } from "src/decorator/get-user.decorator";
import { User } from "src/entity/user.entity";
import { UserService } from "src/service/user.service";

@Controller('user')
export class UserContorller {
    constructor (
        private userService: UserService
    ) {}

    /**
     * 유저 상세정보
     * @param user 
     * @param res 
     */
    @Get('/detail')
    @UseGuards(JwtAuthGuard)
    async myDetailInfo (
        @GetUser() user: User,
        @Res() res: Response
    ) {
        delete user.password;

        res.status(HttpStatus.OK).send(user);
    }
}