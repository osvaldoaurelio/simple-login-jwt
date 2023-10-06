import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CryptModule } from './common/modules/crypt/crypt.module';
import { SwaggerModule } from './common/modules/swagger/swagger.module';
import { AuthModule } from './domain/auth/auth.module';
import { UsersModule } from './domain/users/users.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    SwaggerModule,
    CryptModule,
    UsersModule,
  ],
})
export class AppModule { }
