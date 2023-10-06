import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CryptService } from '../../common/modules/crypt/crypt.service';
import { UserRepository } from '../users/repositories/user.repository';
import { AuthRequestDto, AuthResponseDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly conig: ConfigService,
    private readonly crypt: CryptService,
    private readonly jwt: JwtService,
    private readonly user: UserRepository,
  ) {}

  private async asignToken(userId: string, rememberMe: boolean): Promise<AuthResponseDto> {
    const access_token = await this.jwt.signAsync(
      {
        sub: userId,
        rememberMe,
      },
      {
        expiresIn: '1d',
        secret: this.conig.get('JWT_SECRET'),
      },
    )

    return { access_token };
  }

  async login({ username, password, rememberMe}: AuthRequestDto) {
    const userFound = this.user.findUserByUsername(username);

    if (!userFound) throw new UnauthorizedException('Credentials incorrect');

    const pwMatches = await this.crypt.verify(userFound.hash, password);

    if (!pwMatches) throw new UnauthorizedException('Credentials incorrect');

    return this.asignToken(userFound.id, rememberMe);
  }
}
