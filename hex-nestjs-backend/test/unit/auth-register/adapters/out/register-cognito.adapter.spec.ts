import { RegisterCognitoAdapter } from '../../../../../src/auth-register/adapters/out/register-cognito.adapter';
import { AwsCognitoService } from '../../../../../src/aws-cognito/aws-cognito.service';
import { RegisterDto } from '../../../../../src/auth-register/dto/register.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';

describe('RegisterCognitoAdapter', () => {
  let adapter: RegisterCognitoAdapter;
  let cognitoServiceMock: Partial<AwsCognitoService>;

  beforeEach(async () => {
    cognitoServiceMock = {
      getCognito: jest.fn().mockReturnValue({
        signUp: jest.fn().mockReturnThis(),
        promise: jest.fn(),
      }),
      getSecretHash: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterCognitoAdapter,
        {
          provide: AwsCognitoService,
          useValue: cognitoServiceMock,
        },
      ],
    }).compile();

    adapter = module.get<RegisterCognitoAdapter>(RegisterCognitoAdapter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should sign up a new user successfully and return statusCode 201', async () => {
    
      const mockSignUpResponse = { UserSub: 'someUserSubValue' };
      (cognitoServiceMock
        .getCognito!()
        .signUp()
        .promise as jest.Mock).mockResolvedValue(mockSignUpResponse);

      (cognitoServiceMock.getSecretHash as jest.Mock).mockReturnValue('mockSecretHash');

      const registerDto: RegisterDto = {
        email: 'john.doe@example.com',
        name: 'John Doe',
        password: 'MySecret123',
        address: '123 Main Street',
        birthdate: '1990-01-01',
        phoneNumber: '+1-555-1234',
      };

      const result = await adapter.register(registerDto);

      expect(cognitoServiceMock.getCognito).toHaveBeenCalled();
      expect(cognitoServiceMock.getCognito!().signUp).toHaveBeenCalledWith({
        ClientId: process.env.AWS_COGNITO_CLIENT_ID!,
        Password: registerDto.password,
        Username: registerDto.email,
        SecretHash: 'mockSecretHash',
        UserAttributes: [
          { Name: 'address', Value: registerDto.address },
          { Name: 'birthdate', Value: registerDto.birthdate },
          { Name: 'phone_number', Value: registerDto.phoneNumber },
          { Name: 'name', Value: registerDto.name },
        ],
      });

      expect(result).toEqual({
        ...mockSignUpResponse,
        statusCode: HttpStatus.CREATED,
      });
    });

    it('should handle UsernameExistsException and return 409 "User already exists"', async () => {
      const error = { code: 'UsernameExistsException' };
      (cognitoServiceMock
        .getCognito!()
        .signUp()
        .promise as jest.Mock).mockRejectedValue(error);

      const registerDto: RegisterDto = {
        email: 'existing.user@example.com',
        name: 'Existing User',
        password: 'SomePassword',
        address: '123 Some St',
        birthdate: '1985-07-15',
        phoneNumber: '+1-444-5555',
      };

      const result = await adapter.register(registerDto);

      expect(result).toEqual({
        statusCode: HttpStatus.CONFLICT,
        message: 'User already exists',
      });
    });

    it('should handle InvalidPasswordException and return 400 "Invalid password given"', async () => {
      const error = { code: 'InvalidPasswordException' };
      (cognitoServiceMock
        .getCognito!()
        .signUp()
        .promise as jest.Mock).mockRejectedValue(error);

      const registerDto: RegisterDto = {
        email: 'bad.pass@example.com',
        name: 'Bad Password',
        password: '123',
        address: 'Nowhere Lane',
        birthdate: '1970-02-02',
        phoneNumber: '+1-222-3333',
      };

      const result = await adapter.register(registerDto);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid password given',
      });
    });

    it('should handle InvalidParameterException and return 400 with exception message', async () => {
      const error = {
        code: 'InvalidParameterException',
        message: 'Some invalid parameter message',
      };
      (cognitoServiceMock
        .getCognito!()
        .signUp()
        .promise as jest.Mock).mockRejectedValue(error);

      const registerDto: RegisterDto = {
        email: 'invalid.param@example.com',
        name: 'Invalid Param',
        password: 'SecretPass123',
        address: '',
        birthdate: 'not-a-real-date',
        phoneNumber: 'invalid-phone',
      };

      const result = await adapter.register(registerDto);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Some invalid parameter message',
      });
    });

    it('should handle unknown exceptions and return 400 "Bad Request"', async () => {
      const error = { code: 'UnmappedException', message: 'Something else broke' };
      (cognitoServiceMock
        .getCognito!()
        .signUp()
        .promise as jest.Mock).mockRejectedValue(error);

      const registerDto: RegisterDto = {
        email: 'random.user@example.com',
        name: 'Random User',
        password: 'RandomPass123',
        address: 'Random Address',
        birthdate: '2000-03-03',
        phoneNumber: '+1-666-7777',
      };

      const result = await adapter.register(registerDto);

      expect(result).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad Request',
      });
    });
  });

  describe('getRegisterException', () => {
    it('should return 409 for UsernameExistsException', () => {
      const exception = { code: 'UsernameExistsException' };
      const response = adapter.getRegisterException(exception);

      expect(response).toEqual({
        statusCode: HttpStatus.CONFLICT,
        message: 'User already exists',
      });
    });

    it('should return 400 "Invalid password given" for InvalidPasswordException', () => {
      const exception = { code: 'InvalidPasswordException' };
      const response = adapter.getRegisterException(exception);

      expect(response).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid password given',
      });
    });

    it('should return 400 with exception.message for InvalidParameterException', () => {
      const exception = {
        code: 'InvalidParameterException',
        message: 'Some field is invalid',
      };
      const response = adapter.getRegisterException(exception);

      expect(response).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Some field is invalid',
      });
    });

    it('should return 400 "Bad Request" by default for unknown codes', () => {
      const exception = { code: 'UnknownException' };
      const response = adapter.getRegisterException(exception);

      expect(response).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad Request',
      });
    });
  });
});
