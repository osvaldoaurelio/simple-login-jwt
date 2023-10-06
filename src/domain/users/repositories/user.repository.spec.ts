import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { CryptService } from '../../../common/modules/crypt/crypt.service';
import { CreateUserDto } from '../dto';
import { User } from '../entities';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let cryptService: CryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository, CryptService],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    cryptService = module.get<CryptService>(CryptService);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user and return it', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'testpassword',
        name: 'Test User',
      };

      const hashedPassword = 'hashedpassword';

      jest.spyOn(cryptService, 'hash').mockResolvedValue(hashedPassword);

      const user = await userRepository.createUser(createUserDto);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBe(createUserDto.name);
      expect(user.username).toBe(createUserDto.username);
      expect(user.hash).toBe(hashedPassword);
    });
  });

  describe('findUserById', () => {
    it('should return a user by ID if it exists', () => {
      const userId = uuidv4();

      const user: User = {
        id: userId,
        username: 'testuser',
        hash: 'testpassword',
        name: 'Test User',
      };

      userRepository['users'].push(user);

      const foundUser = userRepository.findUserById(userId);

      expect(foundUser).toBeDefined();
      expect(foundUser.id).toBe(userId);
      expect(foundUser.name).toBe('Test User');
      expect(foundUser.username).toBe('testuser');
    });

    it('should return undefined if user with ID does not exist', () => {
      const foundUser = userRepository.findUserById('nonexistentid');

      expect(foundUser).toBeUndefined();
    });
  });

  describe('findUserByUsername', () => {
    it('should return a user by username if it exists', () => {
      const user: User = {
        id: uuidv4(),
        username: 'testuser',
        hash: 'testpassword',
        name: 'Test User',
      };

      userRepository['users'].push(user);

      const foundUser = userRepository.findUserByUsername('testuser');

      expect(foundUser).toBeDefined();
      expect(foundUser.id).toBe(user.id);
      expect(foundUser.name).toBe('Test User');
      expect(foundUser.username).toBe('testuser');
    });

    it('should return undefined if user with username does not exist', () => {
      const foundUser = userRepository.findUserByUsername('nonexistentuser');

      expect(foundUser).toBeUndefined();
    });
  });
});
