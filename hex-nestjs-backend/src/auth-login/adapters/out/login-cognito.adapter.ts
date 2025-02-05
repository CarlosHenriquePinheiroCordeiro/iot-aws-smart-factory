import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core';
import { LoginPort } from '../../application/ports/out/login.port';
import { LoginDto } from '../../dto/login.dto';
import { AwsCognitoService } from '../../../aws-cognito/aws-cognito.service';
@Injectable()
export class LoginCognitoAdapter extends LoginPort {
  constructor(private readonly cognitoService: AwsCognitoService) {
    super();
  }

  async login(loginDto: LoginDto): Promise<any> {
    try {
      const resp = await this.cognitoService
        .getCognito()
        .initiateAuth({
          AuthFlow: 'USER_PASSWORD_AUTH',
          ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
          AuthParameters: {
            USERNAME: loginDto.email,
            PASSWORD: loginDto.password,
            SECRET_HASH: this.cognitoService.getSecretHash(loginDto.email),
          },
        })
        .promise();
      return {
        accessToken: resp.AuthenticationResult?.AccessToken,
        refreshToken: resp.AuthenticationResult?.RefreshToken,
        idToken: resp.AuthenticationResult?.IdToken,
        statusCode: 200,
      };
    } catch (error) {
      return this.getLoginException(error);
    }
  }

  getLoginException(exception: any) {
    let statusCode = HttpStatus.BAD_REQUEST;
    let message = 'Bad Request';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    switch (exception.code) {
      case 'UserNotConfirmedException':
        statusCode = HttpStatus.CONFLICT;
        message = 'User not confirmed';
        break;

      case 'UserNotFoundException':
        statusCode = HttpStatus.NOT_FOUND;
        message = 'User not found';
        break;

      case 'NotAuthorizedException':
        statusCode = HttpStatus.FORBIDDEN;
        message = 'Not valid credentials';
        break;
      default:
        break;
    }
    return {
      statusCode,
      message,
    };
  }
}
