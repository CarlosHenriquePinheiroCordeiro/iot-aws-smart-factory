import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class CognitoAuthGuard implements CanActivate {
  private readonly verifier;

  constructor(private readonly redisService: RedisService) {
    this.verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.AWS_COGNITO_USER_POOL_ID!,
      clientId: process.env.AWS_COGNITO_CLIENT_ID!,
      tokenUse: 'access',
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Missing Bearer token');
    }

    const cachedPayload = await this.getFromCache(token);

    if (cachedPayload) {
      Object.assign(request, { user: JSON.parse(cachedPayload) });
      return true;
    }
    try {
      const payload = await this.verifier.verify(token);
      Object.assign(request, { user: payload });
      this.saveCache(token as string, payload, payload.exp as number);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async getFromCache(token: string) {
    const cachedPayload = await this.redisService.getClient().get(token);
    return cachedPayload;
  }

  saveCache(token: string, payload: any, exp: number) {
    const nowSeconds = Math.floor(Date.now() / 60);
    const expiresIn = exp - nowSeconds;
    if (expiresIn > 0) {
      this.redisService.getClient().set(token, JSON.stringify(payload), {
        EX: expiresIn,
      });
    }
  }
}
