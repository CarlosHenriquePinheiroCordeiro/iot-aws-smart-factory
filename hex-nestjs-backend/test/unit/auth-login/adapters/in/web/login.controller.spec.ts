import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from '../../../../../../src/auth-login/adapters/in/web/login.controller';
import { LoginUseCase } from '../../../../../../src/auth-login/application/ports/in/login.use-case';
import { LoginDto } from '../../../../../../src/auth-login/dto/login.dto';
import { IHttpResponse } from '../../../../../../src/interfaces/http-response.interface';
import { Response } from 'express';

describe('LoginController', () => {
  let controller: LoginController;
  let loginUseCaseMock: Partial<LoginUseCase>;
  let responseMock: Partial<Response>;

  beforeEach(async () => {
    loginUseCaseMock = {
      login: jest.fn(),
    };

    responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginUseCase,
          useValue: loginUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should call loginUseCase.login with the provided login DTO and return the response', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'test1234',
      };

      const httpResponse: Partial<IHttpResponse> = {
        statusCode: 200,
        message: 'Logged in successfully',
        data: { token: 'mockToken' },
      };

      (loginUseCaseMock.login as jest.Mock).mockResolvedValue(httpResponse);

      await controller.login(loginDto, responseMock as Response);

      expect(loginUseCaseMock.login).toHaveBeenCalledTimes(1);
      expect(loginUseCaseMock.login).toHaveBeenCalledWith(loginDto);

      expect(responseMock.status).toHaveBeenCalledWith(httpResponse.statusCode);
      expect(responseMock.json).toHaveBeenCalledWith(httpResponse);
    });

    it('should handle custom status codes (e.g., 401) from the use case', async () => {
      const loginDto: LoginDto = {
        email: 'test2@example.com',
        password: 'wrongpassword',
      };

      const httpResponse: Partial<IHttpResponse> = {
        statusCode: 401,
        message: 'Unauthorized',
      };

      (loginUseCaseMock.login as jest.Mock).mockResolvedValue(httpResponse);

      await controller.login(loginDto, responseMock as Response);

      expect(responseMock.status).toHaveBeenCalledWith(401);
      expect(responseMock.json).toHaveBeenCalledWith(httpResponse);
    });

    it('should propagate errors thrown by loginUseCase', async () => {
      const loginDto: LoginDto = {
        email: 'error@example.com',
        password: 'error123',
      };
      const mockError = new Error('Login failed');

      (loginUseCaseMock.login as jest.Mock).mockRejectedValue(mockError);

      await expect(controller.login(loginDto, responseMock as Response)).rejects.toThrow(
        'Login failed',
      );

      expect(loginUseCaseMock.login).toHaveBeenCalledWith(loginDto);

      expect(responseMock.status).not.toHaveBeenCalled();
      expect(responseMock.json).not.toHaveBeenCalled();
    });
  });
});
