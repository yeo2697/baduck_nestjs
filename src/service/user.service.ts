import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { UserRepository } from "src/repository/user.repository";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async getByUserEmailAndDeletedDate(userEmail: string) {
        return await this.userRepository.findUserByUserEmailAndDeletdDate(userEmail, null);
    }

    async getByUserEmail(userEmail: string) {
        return await this.userRepository.findUserByUserEmail(userEmail);
    }
}