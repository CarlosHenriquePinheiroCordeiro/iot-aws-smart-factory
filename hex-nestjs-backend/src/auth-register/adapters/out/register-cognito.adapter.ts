import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core';
import { RegisterPort } from 'src/auth-register/application/ports/out/register.port';
import { RegisterDto } from 'src/auth-register/dto/register.dto';
import { AwsCognitoService } from 'src/aws-cognito/aws-cognito.service';

@Injectable()
export class RegisterCognitoAdapter extends RegisterPort {
  constructor(private readonly cognitoService: AwsCognitoService) {
    super();
  }

  async register(registerDto: RegisterDto): Promise<any> {
    try {
      const resp = await this.cognitoService
        .getCognito()
        .signUp({
          ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
          Password: registerDto.password,
          Username: registerDto.email,
          SecretHash: this.cognitoService.getSecretHash(registerDto.email),
          UserAttributes: [
            {
              Name: 'address',
              Value: registerDto.address,
            },
            {
              Name: 'birthdate',
              Value: registerDto.birthdate,
            },
            {
              Name: 'phone_number',
              Value: registerDto.phoneNumber,
            },
            {
              Name: 'name',
              Value: registerDto.name,
            },
          ],
        })
        .promise();
      Object.assign(resp, { statusCode: HttpStatus.CREATED });
      return resp;
    } catch (error) {
      return this.getRegisterException(error);
    }
  }

  getRegisterException(exception: any) {
    let statusCode = HttpStatus.BAD_REQUEST;
    let message = 'Bad Request';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    switch (exception.code) {
      case 'UsernameExistsException':
        statusCode = HttpStatus.CONFLICT;
        message = 'User already exists';
        break;
      case 'InvalidPasswordException':
        message = 'Invalid password given';
        break;
      case 'InvalidParameterException':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        message = exception.message as string;
        break;
      default:
        break;
    }
    return { statusCode, message };
  }
}
