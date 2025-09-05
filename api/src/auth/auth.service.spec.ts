import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User, UserRole, HeroCharacter } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser: User = {
    id: '1',
    name: 'Test Hero',
    email: 'test@heroforce.com',
    password: 'hashedPassword',
    role: UserRole.HERO,
    character: HeroCharacter.MARVEL_SPIDERMAN,
    projects: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockUsersService = {
      findByEmail: jest.fn(),
      validatePassword: jest.fn(),
      create: jest.fn(),
    };

    const mockJwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  describe('validateUser', () => {
    it('deve retornar usuário sem senha se as credenciais forem válidas', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);
      usersService.validatePassword.mockResolvedValue(true);

      const result = await service.validateUser('test@heroforce.com', 'password123');

      expect(usersService.findByEmail).toHaveBeenCalledWith('test@heroforce.com');
      expect(usersService.validatePassword).toHaveBeenCalledWith(mockUser, 'password123');
      expect(result).toBeDefined();
      expect(result).not.toHaveProperty('password');
    });

    it('deve retornar null se a senha for inválida', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);
      usersService.validatePassword.mockResolvedValue(false);

      const result = await service.validateUser('test@heroforce.com', 'wrongpassword');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('deve retornar token de acesso e dados do usuário para credenciais válidas', async () => {
      const loginDto: LoginDto = {
        email: 'test@heroforce.com',
        password: 'password123',
      };

      const mockToken = 'jwt-token';
      
      usersService.findByEmail.mockResolvedValue(mockUser);
      usersService.validatePassword.mockResolvedValue(true);
      jwtService.sign.mockReturnValue(mockToken);

      const result = await service.login(loginDto);

      expect(result).toHaveProperty('access_token', mockToken);
      expect(result).toHaveProperty('user');
      expect(result.user).not.toHaveProperty('password');
    });

    it('deve lançar UnauthorizedException para credenciais inválidas', async () => {
      const loginDto: LoginDto = {
        email: 'test@heroforce.com',
        password: 'wrongpassword',
      };

      usersService.findByEmail.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});