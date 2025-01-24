import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core';
import { ConfirmPort } from 'src/auth-confirm/application/ports/out/confirm.port';
import { ConfirmDto } from 'src/auth-confirm/dto/confirm.dto';
import { AwsCognitoService } from 'src/aws-cognito/aws-cognito.service';
import { IHttpResponse } from 'src/interfaces/http-response.interface';

@Injectable()
export class ConfirmCognitoAdapter extends ConfirmPort {
  constructor(private readonly cognitoService: AwsCognitoService) {
    super();
  }

  async confirm(confirmDto: ConfirmDto): Promise<any> {
    try {
      const resp = await this.cognitoService
        .getCognito()
        .confirmSignUp({
          ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
          Username: confirmDto.email,
          ConfirmationCode: confirmDto.code,
          SecretHash: this.cognitoService.getSecretHash(confirmDto.email),
        })
        .promise();
      Object.assign(resp, { statusCode: 200 });
      return resp;
    } catch (error) {
      return this.getConfirmException(error);
    }
  }

  getConfirmException(exception: any): Partial<IHttpResponse> {
    let statusCode = HttpStatus.BAD_REQUEST;
    let message = 'Bad Request';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    switch (exception.code) {
      case 'UserNotFoundException':
        statusCode = HttpStatus.NOT_FOUND;
        message = 'User not found';
        break;

      case 'CodeMismatchException':
        statusCode = HttpStatus.NOT_ACCEPTABLE;
        message = 'Not valid confirmation code';
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
