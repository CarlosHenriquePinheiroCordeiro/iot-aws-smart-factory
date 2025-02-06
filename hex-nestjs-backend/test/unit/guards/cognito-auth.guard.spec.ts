import { CognitoAuthGuard } from '../../../src/guards/cognito-auth.guard';
import { RedisService } from '../../../src/redis/redis.service';
import { UnauthorizedException } from '@nestjs/common';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('aws-jwt-verify');
jest.mock('../../../src/redis/redis.service');

describe('CognitoAuthGuard', () => {
  let guard: CognitoAuthGuard;
  let redisServiceMock: jest.Mocked<RedisService>;
  let context: ExecutionContext;

  beforeEach(async () => {
    const redisClientMock = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue('OK'),
    } as jest.Mocked<Record<string, jest.Mock>>;  // Ensures Jest functions
  
    redisServiceMock = {
      getClient: jest.fn().mockReturnValue(redisClientMock),
    } as unknown as jest.Mocked<RedisService>;
  
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CognitoAuthGuard,
        { provide: RedisService, useValue: redisServiceMock },
      ],
    }).compile();
  
    guard = module.get<CognitoAuthGuard>(CognitoAuthGuard);
  });

  it('should throw UnauthorizedException if no authorization header is provided', async () => {
    context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: {} }),
      }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if no Bearer token is provided', async () => {
    context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: 'Bearer' } }),
      }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
  });

  it('should return true if token is found in the cache', async () => {
    const token = 'mockToken';
    const cachedPayload = '{"sub": "123"}';
    (redisServiceMock.getClient().get as jest.Mock).mockResolvedValueOnce(cachedPayload);

    context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: `Bearer ${token}` } }),
      }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(redisServiceMock.getClient().get).toHaveBeenCalledWith(token);
  });

  it('should return true if token is successfully verified by CognitoJwtVerifier', async () => {
    const token = 'mockToken';
    const payload = { sub: '123', exp: Math.floor(Date.now() / 1000) + 3600 };

    CognitoJwtVerifier.create = jest.fn().mockReturnValue({
      verify: jest.fn().mockResolvedValue(payload),
    });

    context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: `Bearer ${token}` } }),
      }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(CognitoJwtVerifier.create).toHaveBeenCalledWith({
      userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      clientId: process.env.AWS_COGNITO_CLIENT_ID,
      tokenUse: 'access',
    });
    expect(redisServiceMock.getClient().set).toHaveBeenCalledWith(token, JSON.stringify(payload), { EX: expect.any(Number) });
  });

  it('should throw UnauthorizedException if token verification fails', async () => {
    const token = 'mockToken';
    const error = new Error('Invalid token');
    CognitoJwtVerifier.create = jest.fn().mockReturnValue({
      verify: jest.fn().mockRejectedValue(error),
    });

    context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: `Bearer ${token}` } }),
      }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(context)).rejects.toThrowError(new UnauthorizedException(error.message));
  });
});
