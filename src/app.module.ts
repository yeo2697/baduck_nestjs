import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeORMConfig from 'typeorm.config';
import { AuthModule } from './authentication/auth.module';
import { UserModule } from './module/user.module';

/**
 * Root Module
 * 추가 Module 발생 시, 이 곳에서 추가 필요
 */
const modules = [AuthModule, UserModule];

@Module({
  imports: [
    ...modules,
    TypeOrmModule.forRoot(typeORMConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
  // controllers: [AuthController],
  // providers: [AuthService, UserRepository, JwtService],
})
export class AppModule {}
