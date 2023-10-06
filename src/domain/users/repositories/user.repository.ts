import { Injectable } from '@nestjs/common';
import { CryptService } from '../../../common/modules/crypt/crypt.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto';
import { User } from '../entities';

@Injectable()
export class UserRepository {
  private users: User[] = [];

  constructor(
    private readonly crypt: CryptService
  ) {
    this.createUser({ username: 'username1', password: 'password1', name: 'John Doe' });
    this.createUser({ username: 'username2', password: 'password2', name: 'Mary Doe' });
  }

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await this.crypt.hash(createUserDto.password);

    const user: User = {
      id: uuidv4(),
      name: createUserDto.name,
      username: createUserDto.username,
      hash: hashedPassword,
    };

    this.users.push(user);

    return user;
  }

  findUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  findUserByUsername(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }
}
