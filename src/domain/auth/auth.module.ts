import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { UserRepository } from '../users/repositories/user.repository';
import { CryptService } from 'src/common/modules/crypt/crypt.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    CryptService,
    JwtStrategy,
    UserRepository,
  ],
})
export class AuthModule {}
