import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException } from '@nestjs/common';
import { AuthController } from './auth.controller';
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

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: { login: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT token when login is successful', async () => {
      jest.spyOn(authService, 'login').mockResolvedValue(authResponse);

      const result: AuthResponseDto = await controller.login(authRequest);

      expect(result).toEqual(authResponse);
      expect(authService.login).toHaveBeenCalledWith(authRequest);
    });

    it('should throw an Error when login fails', async () => {
      jest.spyOn(authService, 'login').mockRejectedValue(new Error('Login failed'));

      expect(controller.login(authRequest)).rejects.toThrowError('Login failed');
    });
  });
});
