import { Test, TestingModule } from '@nestjs/testing';
import { CryptService } from './crypt.service';

describe('CryptService', () => {
  let service: CryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptService],
    }).compile();

    service = module.get<CryptService>(CryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash and verify correctly', async () => {
    const plainTextPassword = 'password3';

    const hashedPassword = await service.hash(plainTextPassword);

    const isValid = await service.verify(hashedPassword, plainTextPassword);

    expect(isValid).toBe(true);
  });
});
