import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from '../../../../../../src/auth-register/adapters/in/web/register.controller';
import { RegisterUseCase } from '../../../../../../src/auth-register/application/ports/in/register.use-case';
import { RegisterDto } from '../../../../../../src/auth-register/dto/register.dto';
import { IHttpResponse } from '../../../../../../src/interfaces/http-response.interface';
import { Response } from 'express';

describe('RegisterController', () => {
  let controller: RegisterController;
  let registerUseCaseMock: Partial<RegisterUseCase>;
  let responseMock: Partial<Response>;

  beforeEach(async () => {
    registerUseCaseMock = {
      register: jest.fn(),
    };

    responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [
        {
          provide: RegisterUseCase,
          useValue: registerUseCaseMock,
        },
      ],
    }).compile();

    controller = module.get<RegisterController>(RegisterController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should call registerUseCase.register with the full RegisterDto and return the correct response', async () => {
      const registerDto: RegisterDto = {
        email: 'john.doe@example.com',
        name: 'John Doe',
        password: 'MySecret123',
        address: '123 Main St, Springfield, USA',
        birthdate: '1990-01-01',
        phoneNumber: '+1-555-1234',
      };

      const mockResponse: Partial<IHttpResponse> = {
        statusCode: 201,
        message: 'User registered successfully',
      };
      (registerUseCaseMock.register as jest.Mock).mockResolvedValue(mockResponse);

      await controller.register(registerDto, responseMock as Response);

      expect(registerUseCaseMock.register).toHaveBeenCalledTimes(1);
      expect(registerUseCaseMock.register).toHaveBeenCalledWith(registerDto);

      expect(responseMock.status).toHaveBeenCalledWith(mockResponse.statusCode);
      expect(responseMock.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should handle error responses properly', async () => {
      const registerDto: RegisterDto = {
        email: 'bad.user@example.com',
        name: 'Bad User',
        password: '123',
        address: 'No Address',
        birthdate: '2000-12-31',
        phoneNumber: '+1-111-2222',
      };

      const errorResponse: Partial<IHttpResponse> = {
        statusCode: 400,
        message: 'Invalid registration details',
      };
      (registerUseCaseMock.register as jest.Mock).mockResolvedValue(errorResponse);

      await controller.register(registerDto, responseMock as Response);

      expect(registerUseCaseMock.register).toHaveBeenCalledWith(registerDto);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(responseMock.json).toHaveBeenCalledWith(errorResponse);
    });

    it('should propagate any error thrown by registerUseCase.register', async () => {
      const registerDto: RegisterDto = {
        email: 'error.user@example.com',
        name: 'Error User',
        password: 'throwError123',
        address: '1234 Nowhere Ln',
        birthdate: '1980-10-10',
        phoneNumber: '+1-999-9999',
      };

      const mockError = new Error('Registration failed unexpectedly');
      (registerUseCaseMock.register as jest.Mock).mockRejectedValue(mockError);

      await expect(controller.register(registerDto, responseMock as Response)).rejects.toThrow(
        'Registration failed unexpectedly',
      );

      expect(responseMock.status).not.toHaveBeenCalled();
      expect(responseMock.json).not.toHaveBeenCalled();
    });
  });
});
