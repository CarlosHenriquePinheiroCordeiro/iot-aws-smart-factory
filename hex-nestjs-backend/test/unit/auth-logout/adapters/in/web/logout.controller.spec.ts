import { Test, TestingModule } from '@nestjs/testing';
import { LogoutController } from '../../../../../../src/auth-logout/adapters/in/web/logout.controller';
import { LogoutUseCase } from '../../../../../../src/auth-logout/application/ports/in/logout.use-case';
import { Response } from 'express';
import { IHttpResponse } from '../../../../../../src/interfaces/http-response.interface';
import { CognitoAuthGuard } from '../../../../../../src/guards/cognito-auth.guard';
import { Reflector } from '@nestjs/core';

class MockCognitoAuthGuard {
  canActivate() {
    return true;
  }
}

describe('LogoutController', () => {
  let controller: LogoutController;
  let logoutUseCaseMock: Partial<LogoutUseCase>;
  let responseMock: Partial<Response>;

  beforeEach(async () => {
    logoutUseCaseMock = {
      logout: jest.fn(),
    };

    responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogoutController],
      providers: [
        {
          provide: LogoutUseCase,
          useValue: logoutUseCaseMock,
        },
      ],
    })
      .overrideGuard(CognitoAuthGuard)
      .useClass(MockCognitoAuthGuard)
      .compile();

    controller = module.get<LogoutController>(LogoutController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Decorator Checks', () => {
    it('should use CognitoAuthGuard at the class level', () => {
      const reflector = new Reflector();
      const guards = Reflect.getMetadata('__guards__', LogoutController) || [];
      const guardInstances = guards.map((guard: any) => guard.name || guard);

      expect(guardInstances).toContain(CognitoAuthGuard.name);
    });
  });

  describe('logout', () => {
    it('should call logoutUseCase.logout with the token from the Authorization header', async () => {
      const token = 'mockAccessToken';
      const headers = { authorization: `Bearer ${token}` };
      const mockResponse: Partial<IHttpResponse> = {
        statusCode: 200,
        message: 'Logged out successfully',
      };
      (logoutUseCaseMock.logout as jest.Mock).mockResolvedValue(mockResponse);

      await controller.logout(headers, responseMock as Response);

      expect(logoutUseCaseMock.logout).toHaveBeenCalledTimes(1);
      expect(logoutUseCaseMock.logout).toHaveBeenCalledWith(token);
      expect(responseMock.status).toHaveBeenCalledWith(mockResponse.statusCode);
      expect(responseMock.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should handle error from logoutUseCase.logout and still return a response', async () => {
      const token = 'anotherMockToken';
      const headers = { authorization: `Bearer ${token}` };
      const errorResponse = {
        statusCode: 400,
        message: 'Something went wrong',
      };
      (logoutUseCaseMock.logout as jest.Mock).mockResolvedValue(errorResponse);

      await controller.logout(headers, responseMock as Response);

      expect(logoutUseCaseMock.logout).toHaveBeenCalledWith(token);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(responseMock.json).toHaveBeenCalledWith(errorResponse);
    });

    it('should handle missing Authorization header gracefully (if not handled by a guard)', async () => {
      const headers = {};
      await expect(
        controller.logout(headers, responseMock as Response),
      ).rejects.toThrowError();
    });
  });
});
