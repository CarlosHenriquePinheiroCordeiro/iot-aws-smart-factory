import { RegisterService } from '../../../../../src/auth-register/application/services/register.service';
import { RegisterPort } from '../../../../../src/auth-register/application/ports/out/register.port';
import { RegisterDto } from '../../../../../src/auth-register/dto/register.dto';
import { Test, TestingModule } from '@nestjs/testing';

describe('RegisterService', () => {
  let service: RegisterService;
  let registerPortMock: Partial<RegisterPort>;

  beforeEach(async () => {
    registerPortMock = {
      register: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterService,
        {
          provide: RegisterPort,
          useValue: registerPortMock,
        },
      ],
    }).compile();

    service = module.get<RegisterService>(RegisterService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should call registerPort.register with the provided RegisterDto', async () => {
      const registerDto: RegisterDto = {
        email: 'john.doe@example.com',
        name: 'John Doe',
        password: 'Secret123',
        address: '123 Main Street',
        birthdate: '1990-01-01',
        phoneNumber: '+1-555-1234',
      };

      await service.register(registerDto);

      expect(registerPortMock.register).toHaveBeenCalledTimes(1);
      expect(registerPortMock.register).toHaveBeenCalledWith(registerDto);
    });

    it('should return the response from registerPort.register', async () => {
      const registerDto: RegisterDto = {
        email: 'jane.doe@example.com',
        name: 'Jane Doe',
        password: 'MySecret',
        address: '456 Secondary Rd',
        birthdate: '1992-12-12',
        phoneNumber: '+1-555-6789',
      };
      const mockResponse = { statusCode: 201, message: 'User registered' };
      (registerPortMock.register as jest.Mock).mockResolvedValue(mockResponse);

      const result = await service.register(registerDto);

      expect(result).toBe(mockResponse);
    });

    it('should propagate errors from registerPort.register', async () => {
      const registerDto: RegisterDto = {
        email: 'error.user@example.com',
        name: 'Error User',
        password: 'SuperSecret',
        address: 'NoAddress',
        birthdate: 'invalid-date',
        phoneNumber: 'bad-phone',
      };
      const mockError = new Error('Failed to register user');
      (registerPortMock.register as jest.Mock).mockRejectedValue(mockError);

      await expect(service.register(registerDto)).rejects.toThrow(mockError);
    });
  });
});
