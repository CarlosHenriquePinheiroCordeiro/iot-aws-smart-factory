import { LoginCognitoAdapter } from '../../../../../src/auth-login/adapters/out/login-cognito.adapter';
import { AwsCognitoService } from '../../../../../src/auth/aws-cognito/aws-cognito.service';
import { LoginDto } from '../../../../../src/auth-login/dto/login.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';

describe('LoginCognitoAdapter', () => {
  let adapter: LoginCognitoAdapter;
  let cognitoServiceMock: Partial<AwsCognitoService>;

  beforeEach(async () => {
    cognitoServiceMock = {
      getCognito: jest.fn().mockReturnValue({
        initiateAuth: jest.fn().mockReturnThis(),
        promise: jest.fn(),
      }),
      getSecretHash: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginCognitoAdapter,
        {
          provide: AwsCognitoService,
          useValue: cognitoServiceMock,
        },
      ],
    }).compile();

    adapter = module.get<LoginCognitoAdapter>(LoginCognitoAdapter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should initiate auth successfully and return the tokens with statusCode 200', async () => {
      const mockAuthResult = {
        AuthenticationResult: {
          AccessToken: 'mockAccessToken',
          RefreshToken: 'mockRefreshToken',
          IdToken: 'mockIdToken',
        },
      };

      (cognitoServiceMock.getSecretHash as jest.Mock).mockReturnValue('mockSecretHash');
      (cognitoServiceMock
        .getCognito!()
        .initiateAuth()
        .promise as jest.Mock).mockResolvedValue(mockAuthResult);

      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'Password123',
      };

      const result = await adapter.login(loginDto);

      expect(cognitoServiceMock.getCognito).toHaveBeenCalled();
      expect(cognitoServiceMock.getCognito!().initiateAuth).toHaveBeenCalledWith({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
        AuthParameters: {
          USERNAME: loginDto.email,
          PASSWORD: loginDto.password,
          SECRET_HASH: 'mockSecretHash',
        },
      });
      expect(result).toEqual({
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
        idToken: 'mockIdToken',
        statusCode: 200,
      });
    });

    it('should handle UserNotConfirmedException and return 409 with "User not confirmed"', async () => {
      const error = { code: 'UserNotConfirmedException' };
      (cognitoServiceMock
        .getCognito!()
        .initiateAuth()
        .promise as jest.Mock).mockRejectedValue(error);

      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'Password123',
      };

      const result = await adapter.login(loginDto);

      expect(result.statusCode).toBe(HttpStatus.CONFLICT);
      expect(result.message).toBe('User not confirmed');
    });

    it('should handle UserNotFoundException and return 404 with "User not found"', async () => {
      const error = { code: 'UserNotFoundException' };
      (cognitoServiceMock
        .getCognito!()
        .initiateAuth()
        .promise as jest.Mock).mockRejectedValue(error);

      const loginDto: LoginDto = {
        email: 'unknown@example.com',
        password: 'Password123',
      };

      const result = await adapter.login(loginDto);

      expect(result.statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(result.message).toBe('User not found');
    });

    it('should handle NotAuthorizedException and return 403 with "Not valid credentials"', async () => {
      const error = { code: 'NotAuthorizedException' };
      (cognitoServiceMock
        .getCognito!()
        .initiateAuth()
        .promise as jest.Mock).mockRejectedValue(error);

      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'invalid',
      };

      const result = await adapter.login(loginDto);

      expect(result.statusCode).toBe(HttpStatus.FORBIDDEN);
      expect(result.message).toBe('Not valid credentials');
    });

    it('should handle unknown errors and return 400 with "Bad Request"', async () => {
      const error = { code: 'SomeOtherException' };
      (cognitoServiceMock
        .getCognito!()
        .initiateAuth()
        .promise as jest.Mock).mockRejectedValue(error);

      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'Password123',
      };

      const result = await adapter.login(loginDto);

      expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(result.message).toBe('Bad Request');
    });
  });

  describe('getLoginException', () => {
    it('should return 409 "User not confirmed" for UserNotConfirmedException', () => {
      const error = { code: 'UserNotConfirmedException' };
      const result = adapter.getLoginException(error);

      expect(result).toEqual({
        statusCode: HttpStatus.CONFLICT,
        message: 'User not confirmed',
      });
    });

    it('should return 404 "User not found" for UserNotFoundException', () => {
      const error = { code: 'UserNotFoundException' };
      const result = adapter.getLoginException(error);

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    });

    it('should return 403 "Not valid credentials" for NotAuthorizedException', () => {
      const error = { code: 'NotAuthorizedException' };
      const result = adapter.getLoginException(error);

      expect(result).toEqual({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Not valid credentials',
      });
    });

    it('should return 400 "Bad Request" by default for unknown errors', () => {
      const error = { code: 'UnknownError' };
      const result = adapter.getLoginException(error);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad Request',
      });
    });
  });
});
