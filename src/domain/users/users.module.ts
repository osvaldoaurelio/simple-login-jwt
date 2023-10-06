import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CryptService } from 'src/common/modules/crypt/crypt.service';

@Module({
  providers: [UserRepository, CryptService],
})
export class UsersModule {}
