import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CryptService } from '../../common/modules/crypt/crypt.service';
import { User } from '../users/entities';
import { UserRepository } from '../users/repositories/user.repository';
import { AuthService } from './auth.service';
import { AuthRequestDto, AuthResponseDto } from './dto';

const authRequest: AuthRequestDto = {
  username: 'testuser',
  password: 'testpassword',
  rememberMe: false,
};

const authResponse: AuthResponseDto = {
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
};

describe('AuthService', () => {
  let service: AuthService;
  let configService: ConfigService;
  let cryptService: CryptService;
  let jwtService: JwtService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: { get: jest.fn() },
        },
        {
          provide: CryptService,
          useValue: {
            hash: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: { signAsync: jest.fn() },
        },
        {
          provide: UserRepository,
          useValue: { findUserByUsername: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    configService = module.get<ConfigService>(ConfigService);
    cryptService = module.get<CryptService>(CryptService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should throw UnauthorizedException when user is not found', () => {
      jest.spyOn(userRepository, 'findUserByUsername').mockResolvedValue(undefined as never);

      expect(service.login(authRequest)).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('should throw UnauthorizedException when password does not match', () => {
      jest.spyOn(cryptService, 'verify').mockResolvedValue(false);
      
      expect(service.login(authRequest)).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('should return an access token when login is successful', async () => {
      jest.spyOn(userRepository, 'findUserByUsername').mockReturnValue({} as User);
      jest.spyOn(cryptService, 'verify').mockResolvedValue(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(authResponse.access_token)

      const result = await service.login(authRequest);

      expect(result).toEqual(authResponse);
    });
  });
});
