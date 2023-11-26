import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import * as bcrypt from "bcrypt";
import { UserRepository } from "src/repository/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { TokenDto } from "src/dto/authentication/token.dto";
import { SignInDto } from "src/dto/authentication/signIn.dto";
import { User } from "src/entity/user.entity";
import { SignUpDto } from "src/dto/authentication/signUp.dto";
import { UserAuthorityRepository } from "src/repository/userAuthority.repository";
import { AuthorityRepository } from "src/repository/authority.repository";
import { Authority } from "src/entity/Authority.entity";
import { UserAuthority } from "src/entity/userAuthority.entity";
import { DataSource, Entity, EntityManager } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(UserAuthorityRepository)
        private userAuthorityRepository: UserAuthorityRepository,
        @InjectRepository(AuthorityRepository)
        private authorityRepository: AuthorityRepository,
        private jwtService: JwtService,
        private dataSource: DataSource
    ) {}

    public async validator(userEmail: string, password: string): Promise <TokenDto> {
        try {
            const user = await this.userRepository.findUserByUserEmail(userEmail);
            
            if (!user) throw new NotFoundException();
            
            const isPasswordMatching = await bcrypt.compare(
                password,
                user.password
            );
            
            if (!isPasswordMatching) throw new UnauthorizedException();
            
            const accessToken = this.jwtService.sign({
                userEmail
            });
            
            const token = new TokenDto();
            token.token = accessToken;
        
            return token;
        } catch (error) {
            console.error(error);
            throw new HttpException(
                '잘못된 인증 정보입니다.',
                HttpStatus.BAD_REQUEST
            )
        }
    }

    
    public async signup(signUpDto: SignUpDto): Promise <void> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const currentTime = new Date();
            
            const getUserRepository = queryRunner.manager.getRepository(User);
            const getUserAuthorityRepository = queryRunner.manager.getRepository(UserAuthority);
            const getAuthorityRepository = queryRunner.manager.getRepository(Authority);

            const user = await getUserRepository.save({
                user_name: signUpDto.userName,
                user_nickname: signUpDto.userNickname,
                user_email: signUpDto.userEmail,
                password: await bcrypt.hash(signUpDto.password, 5),
                mobile_phone: signUpDto.mobilePhone,
                address: signUpDto.address,
                birth_year: signUpDto.birthYear,
                birth_month: signUpDto.birthMonth,
                birth_day: signUpDto.birthDay,
                created_date: currentTime,
            });

            if (!user) throw new BadRequestException();

            delete user.password;

            const authority = await getAuthorityRepository.createQueryBuilder('authority')
            .where(`authority.authority_name = 'GENERAL'`)
            .getOne();

            if (!authority) throw new InternalServerErrorException();

            const userAuthority = await getUserAuthorityRepository.save({
                enabled: true,
                created_date: currentTime,
                user,
                authority,
            });

            if (!userAuthority) throw new InternalServerErrorException();

            await queryRunner.commitTransaction();
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException();
        } finally {
            await queryRunner.release();
        }
    }
}