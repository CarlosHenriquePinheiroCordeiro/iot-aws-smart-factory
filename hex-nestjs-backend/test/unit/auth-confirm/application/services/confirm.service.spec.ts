import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmService } from '../../../../../src/auth-confirm/application/services/confirm.service';
import { ConfirmPort } from '../../../../../src/auth-confirm/application/ports/out/confirm.port';
import { ConfirmDto } from '../../../../../src/auth-confirm/dto/confirm.dto';

describe('ConfirmService', () => {
  let service: ConfirmService;
  let confirmPortMock: Partial<ConfirmPort>;

  beforeEach(async () => {
    confirmPortMock = {
      confirm: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfirmService,
        {
          provide: ConfirmPort,
          useValue: confirmPortMock,
        },
      ],
    }).compile();

    service = module.get<ConfirmService>(ConfirmService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('confirm', () => {
    it('should call confirmPort.confirm with the provided ConfirmDto', () => {
      const confirmDto: ConfirmDto = {
        email: 'test@example.com',
        code: '123456',
      };

      service.confirm(confirmDto);

      expect(confirmPortMock.confirm).toHaveBeenCalledTimes(1);
      expect(confirmPortMock.confirm).toHaveBeenCalledWith(confirmDto);
    });

    it('should return the value that confirmPort.confirm resolves with', async () => {
      const confirmDto: ConfirmDto = {
        email: 'test@example.com',
        code: '123456',
      };

      const mockResponse = { statusCode: 200, message: 'Confirmed' };
      (confirmPortMock.confirm as jest.Mock).mockResolvedValue(mockResponse);

      const result = await service.confirm(confirmDto);
      expect(result).toBe(mockResponse);
    });

    it('should propagate any error thrown by confirmPort.confirm', async () => {
      const confirmDto: ConfirmDto = {
        email: 'test@example.com',
        code: '123456',
      };

      const mockError = new Error('Confirmation Failed');
      (confirmPortMock.confirm as jest.Mock).mockRejectedValue(mockError);

      await expect(service.confirm(confirmDto)).rejects.toThrow('Confirmation Failed');
    });
  });
});
