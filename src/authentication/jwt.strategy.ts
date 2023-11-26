// jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from 'src/authentication/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/user.repository';
import { User } from 'src/entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * User 정보 얻기
   * @param payload 
   * @returns 
   */
  async validate(payload: any): Promise<any> {
    const user: User = await this.userRepository.findUserByUserEmail(payload.userEmail);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
