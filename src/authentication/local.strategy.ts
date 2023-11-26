// local.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userEmail: string, password: string): Promise<any> {
    const user = await this.authService.validator(userEmail, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
