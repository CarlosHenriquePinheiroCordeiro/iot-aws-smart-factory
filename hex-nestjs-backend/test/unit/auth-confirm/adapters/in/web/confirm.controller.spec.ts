import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { ConfirmController } from '../../../../../../src/auth-confirm/adapters/in/web/confirm.controller';
import { ConfirmUseCase } from '../../../../../../src/auth-confirm/application/ports/in/confirm.use-case';
import { ConfirmDto } from '../../../../../../src/auth-confirm/dto/confirm.dto';
import { IHttpResponse } from '../../../../../../src/interfaces/http-response.interface';

describe('ConfirmController', () => {
  let controller: ConfirmController;
  let confirmUseCase: ConfirmUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfirmController],
      providers: [
        {
          provide: ConfirmUseCase,
          useValue: {
            confirm: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ConfirmController>(ConfirmController);
    confirmUseCase = module.get<ConfirmUseCase>(ConfirmUseCase);
  });

  it('should call confirmUseCase and return the expected response', async () => {
    const mockConfirmDto: ConfirmDto = {
      email: 'test@gmail.com',
      code: '123456',
    };
    const mockHttpResponse: Partial<IHttpResponse> = {
      statusCode: 200,
      message: 'Confirmation successful',
    };

    (confirmUseCase.confirm as jest.Mock).mockResolvedValue(mockHttpResponse);

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.confirm(mockConfirmDto, mockResponse as Response);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(confirmUseCase.confirm).toHaveBeenCalledWith(mockConfirmDto);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockHttpResponse);
  });
});
