import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserContorller } from "src/controller/user.controller";
import { UserRepository } from "src/repository/user.repository";
import { UserService } from "src/service/user.service";
import typeORMConfig from "typeorm.config";

@Module({
    // imports: [
    //     TypeOrmModule.forRoot(typeORMConfig),
    // ],
    controllers: [UserContorller],
    providers: [UserService, UserRepository],
    exports: [UserService]
})
export class UserModule {}