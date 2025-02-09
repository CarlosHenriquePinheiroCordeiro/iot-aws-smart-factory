import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { ConfirmCognitoAdapter } from '../../../../../src/auth-confirm/adapters/out/confirm-cognito.adapter';
import { AwsCognitoService } from '../../../../../src/aws-cognito/aws-cognito.service';
import { ConfirmDto } from '../../../../../src/auth-confirm/dto/confirm.dto';
import { IHttpResponse } from '../../../../../src/interfaces/http-response.interface';

describe('ConfirmCognitoAdapter', () => {
  let adapter: ConfirmCognitoAdapter;
  let mockCognitoService: Partial<AwsCognitoService>;

  beforeEach(async () => {
    mockCognitoService = {
      getCognito: jest.fn().mockReturnValue({
        confirmSignUp: jest.fn().mockReturnThis(),
        promise: jest.fn(),
      }),
      getSecretHash: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfirmCognitoAdapter,
        {
          provide: AwsCognitoService,
          useValue: mockCognitoService,
        },
      ],
    }).compile();

    adapter = module.get<ConfirmCognitoAdapter>(ConfirmCognitoAdapter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('confirm', () => {
    it('should confirm signup successfully and return response with statusCode 200', async () => {
      const mockResp = { message: 'Confirmed' };
      // Mock Cognito confirmSignUp promise to resolve successfully
      (mockCognitoService.getCognito!().confirmSignUp().promise as jest.Mock).mockResolvedValue(
        mockResp,
      );
      (mockCognitoService.getSecretHash as jest.Mock).mockReturnValue('mockSecretHash');

      const confirmDto: ConfirmDto = {
        email: 'test@example.com',
        code: '1234',
      };

      const result = await adapter.confirm(confirmDto);

      expect(mockCognitoService.getCognito).toHaveBeenCalled();
      expect(mockCognitoService.getCognito!().confirmSignUp).toHaveBeenCalledWith({
        ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
        Username: confirmDto.email,
        ConfirmationCode: confirmDto.code,
        SecretHash: 'mockSecretHash',
      });

      expect(result).toEqual({
        ...mockResp,
        statusCode: 200,
      });
    });

    it('should handle UserNotFoundException and return 404 status code', async () => {
      const error = { code: 'UserNotFoundException' };
      (mockCognitoService.getCognito!().confirmSignUp().promise as jest.Mock).mockRejectedValue(
        error,
      );

      const confirmDto: ConfirmDto = {
        email: 'unknown@example.com',
        code: '9999',
      };

      const result = await adapter.confirm(confirmDto);

      expect(result).toEqual<Partial<IHttpResponse>>({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    });

    it('should handle CodeMismatchException and return 406 status code', async () => {
      const error = { code: 'CodeMismatchException' };
      (mockCognitoService.getCognito!().confirmSignUp().promise as jest.Mock).mockRejectedValue(
        error,
      );

      const confirmDto: ConfirmDto = {
        email: 'test@example.com',
        code: 'invalid',
      };

      const result = await adapter.confirm(confirmDto);

      expect(result).toEqual<Partial<IHttpResponse>>({
        statusCode: HttpStatus.NOT_ACCEPTABLE,
        message: 'Not valid confirmation code',
      });
    });

    it('should handle unknown exceptions and return 400 status code', async () => {
      const error = { code: 'SomeRandomException' };
      (mockCognitoService.getCognito!().confirmSignUp().promise as jest.Mock).mockRejectedValue(
        error,
      );

      const confirmDto: ConfirmDto = {
        email: 'test@example.com',
        code: '1234',
      };

      const result = await adapter.confirm(confirmDto);

      expect(result).toEqual<Partial<IHttpResponse>>({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad Request',
      });
    });
  });

  describe('getConfirmException', () => {
    it('should return default error when exception.code is not recognized', () => {
      const exception = { code: 'UnknownError' };
      const response = adapter.getConfirmException(exception);

      expect(response).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad Request',
      });
    });

    it('should return the correct error for "UserNotFoundException"', () => {
      const exception = { code: 'UserNotFoundException' };
      const response = adapter.getConfirmException(exception);

      expect(response).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    });

    it('should return the correct error for "CodeMismatchException"', () => {
      const exception = { code: 'CodeMismatchException' };
      const response = adapter.getConfirmException(exception);

      expect(response).toEqual({
        statusCode: HttpStatus.NOT_ACCEPTABLE,
        message: 'Not valid confirmation code',
      });
    });
  });
});
