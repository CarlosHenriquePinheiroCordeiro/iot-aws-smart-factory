import { LoginService } from '../../../../../src/auth-login/application/services/login.service';
import { LoginPort } from '../../../../../src/auth-login/application/ports/out/login.port';
import { LoginDto } from '../../../../../src/auth-login/dto/login.dto';
import { Test, TestingModule } from '@nestjs/testing';
import 'reflect-metadata';

describe('LoginService', () => {
  let loginService: LoginService;
  let loginPortMock: Partial<LoginPort>;

  beforeEach(async () => {
    loginPortMock = {
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: LoginPort,
          useValue: loginPortMock,
        },
      ],
    }).compile();

    loginService = module.get<LoginService>(LoginService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should call loginPort.login with the provided LoginDto', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'test1234',
      };

      await loginService.login(loginDto);

      expect(loginPortMock.login).toHaveBeenCalledTimes(1);
      expect(loginPortMock.login).toHaveBeenCalledWith(loginDto);
    });

    it('should return the response that loginPort.login resolves with', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'test1234',
      };

      const mockResponse = { statusCode: 200, data: { token: 'mockToken' } };
      (loginPortMock.login as jest.Mock).mockResolvedValue(mockResponse);

      const result = await loginService.login(loginDto);

      expect(result).toEqual(mockResponse);
    });

    it('should propagate any error thrown by loginPort.login', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'test1234',
      };

      const mockError = new Error('Login failed');
      (loginPortMock.login as jest.Mock).mockRejectedValue(mockError);

      await expect(loginService.login(loginDto)).rejects.toThrow(mockError);
    });
  });
});
