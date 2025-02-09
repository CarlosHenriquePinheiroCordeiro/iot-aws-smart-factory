import { LogoutService } from '../../../../../src/auth-logout/application/services/logout.service';
import { LogoutPort } from '../../../../../src/auth-logout/application/ports/out/logout.port';
import { Test, TestingModule } from '@nestjs/testing';
import 'reflect-metadata';

describe('LogoutService', () => {
  let logoutService: LogoutService;
  let logoutPortMock: Partial<LogoutPort>;

  beforeEach(async () => {
    logoutPortMock = {
      logout: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogoutService,
        {
          provide: LogoutPort,
          useValue: logoutPortMock,
        },
      ],
    }).compile();

    logoutService = module.get<LogoutService>(LogoutService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('logout', () => {
    it('should call logoutPort.logout with the provided token', async () => {
      const token = 'mockToken';
      await logoutService.logout(token);

      expect(logoutPortMock.logout).toHaveBeenCalledTimes(1);
      expect(logoutPortMock.logout).toHaveBeenCalledWith(token);
    });

    it('should return the response from logoutPort.logout', async () => {
      const token = 'anotherMockToken';
      const mockResponse = { statusCode: 200, message: 'Logged out successfully' };

      (logoutPortMock.logout as jest.Mock).mockResolvedValue(mockResponse);

      const result = await logoutService.logout(token);
      expect(result).toEqual(mockResponse);
    });

    it('should propagate any error thrown by logoutPort.logout', async () => {
      const token = 'errorToken';
      const mockError = new Error('Logout failed');
      (logoutPortMock.logout as jest.Mock).mockRejectedValue(mockError);

      await expect(logoutService.logout(token)).rejects.toThrow('Logout failed');
    });
  });
});
