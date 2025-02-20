import { LogoutCognitoAdapter } from '../../../../../src/auth-logout/adapters/out/logout-cognito.adapter';
import { AwsCognitoService } from '../../../../../src/auth/aws-cognito/aws-cognito.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';

describe('LogoutCognitoAdapter', () => {
  let adapter: LogoutCognitoAdapter;
  let cognitoServiceMock: Partial<AwsCognitoService>;

  beforeEach(async () => {
    cognitoServiceMock = {
      getCognito: jest.fn().mockReturnValue({
        globalSignOut: jest.fn().mockReturnThis(),
        promise: jest.fn(),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogoutCognitoAdapter,
        {
          provide: AwsCognitoService,
          useValue: cognitoServiceMock,
        },
      ],
    }).compile();

    adapter = module.get<LogoutCognitoAdapter>(LogoutCognitoAdapter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('logout', () => {
    it('should sign out successfully and return statusCode 200', async () => {
      (cognitoServiceMock
        .getCognito!()
        .globalSignOut()
        .promise as jest.Mock).mockResolvedValue({});

      const token = 'mockAccessToken';
      const result = await adapter.logout(token);

      expect(cognitoServiceMock.getCognito).toHaveBeenCalledTimes(2);
      expect(cognitoServiceMock.getCognito!().globalSignOut).toHaveBeenCalledWith({
        AccessToken: token,
      });
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
      });
    });

    it('should handle InvalidParameterException and return 406 with "Not valid logout parameter"', async () => {
      const error = { code: 'InvalidParameterException' };
      (cognitoServiceMock
        .getCognito!()
        .globalSignOut()
        .promise as jest.Mock).mockRejectedValue(error);

      const token = 'invalidParameterToken';
      const result = await adapter.logout(token);

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_ACCEPTABLE,
        message: 'Not valid logout parameter',
      });
    });

    it('should handle NotAuthorizedException and return 404 with "Invalid access token"', async () => {
      const error = { code: 'NotAuthorizedException' };
      (cognitoServiceMock
        .getCognito!()
        .globalSignOut()
        .promise as jest.Mock).mockRejectedValue(error);

      const token = 'expiredToken';
      const result = await adapter.logout(token);

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Invalid access token',
      });
    });

    it('should handle unknown errors and return 400 with "Bad Request"', async () => {
      const error = { code: 'UnknownException' };
      (cognitoServiceMock
        .getCognito!()
        .globalSignOut()
        .promise as jest.Mock).mockRejectedValue(error);

      const token = 'someUnknownToken';
      const result = await adapter.logout(token);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad Request',
      });
    });
  });

  describe('getLogoutException', () => {
    it('should return 406 for InvalidParameterException', () => {
      const exception = { code: 'InvalidParameterException' };
      const result = adapter.getLogoutException(exception);

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_ACCEPTABLE,
        message: 'Not valid logout parameter',
      });
    });

    it('should return 404 for NotAuthorizedException', () => {
      const exception = { code: 'NotAuthorizedException' };
      const result = adapter.getLogoutException(exception);

      expect(result).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Invalid access token',
      });
    });

    it('should return 400 for unknown exception', () => {
      const exception = { code: 'SomeOtherException' };
      const result = adapter.getLogoutException(exception);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad Request',
      });
    });
  });
});
