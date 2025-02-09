import { Controller, UseGuards } from '@nestjs/common/decorators/core';
import { Delete, Headers, Res } from '@nestjs/common/decorators/http';
import { LogoutUseCase } from '../../../application/ports/in/logout.use-case';
import { Response } from 'express';
import { IHttpResponse } from '../../../../interfaces/http-response.interface';
import { CognitoAuthGuard } from '../../../../guards/cognito-auth.guard';

@Controller('logout')
@UseGuards(CognitoAuthGuard)
export class LogoutController {
  constructor(private readonly logoutUseCase: LogoutUseCase) {}

  @Delete()
  async logout(@Headers() header: any, @Res() response: Response) {
    const token: string = header.authorization.split(' ')[1] as string;
    const resp: Partial<IHttpResponse> = (await this.logoutUseCase.logout(
      token,
    )) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }
}
