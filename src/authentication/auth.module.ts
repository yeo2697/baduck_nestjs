import { AuthService } from "src/service/auth.service";
import { UserModule } from "../module/user.module";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "src/authentication/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/authentication/constants";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/repository/user.repository";
import { AuthController } from "src/controller/auth.controller";
import { UserAuthorityRepository } from "src/repository/userAuthority.repository";
import { AuthorityRepository } from "src/repository/authority.repository";
import typeORMConfig from "typeorm.config";
import { User } from "src/entity/user.entity";
import { UserAuthority } from "src/entity/userAuthority.entity";
import { Authority } from "src/entity/Authority.entity";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        // UserModule,
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' }
        }),
        TypeOrmModule.forFeature([User, UserAuthority, Authority])
        // TypeOrmModule.forRoot(typeORMConfig),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy, UserRepository, UserAuthorityRepository, AuthorityRepository],
    exports: [AuthService]
})
export class AuthModule {}