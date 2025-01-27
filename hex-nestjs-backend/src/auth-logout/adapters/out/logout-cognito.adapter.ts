import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core';
import { LogoutPort } from 'src/auth-logout/application/ports/out/logout.port';
import { AwsCognitoService } from 'src/aws-cognito/aws-cognito.service';

@Injectable()
export class LogoutCognitoAdapter extends LogoutPort {
  constructor(private readonly cognitoService: AwsCognitoService) {
    super();
  }

  async logout(token: string): Promise<any> {
    try {
      await this.cognitoService
        .getCognito()
        .globalSignOut({
          AccessToken: token,
        })
        .promise();
      return {
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return this.getLogoutException(error);
    }
  }

  getLogoutException(exception) {
    let statusCode = HttpStatus.BAD_REQUEST;
    let message = 'Bad Request';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    switch (exception.code) {
      case 'InvalidParameterException':
        statusCode = HttpStatus.NOT_ACCEPTABLE;
        message = 'Not valid logout parameter';
        break;

      case 'NotAuthorizedException':
        statusCode = HttpStatus.NOT_FOUND;
        message = 'Invalid access token';
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
