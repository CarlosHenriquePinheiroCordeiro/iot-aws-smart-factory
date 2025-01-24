import { Controller } from '@nestjs/common/decorators/core';
import { Body, Post, Res } from '@nestjs/common/decorators/http';
import { LogoutUseCase } from 'src/auth-logout/application/ports/in/logout.use-case';
import { LogoutDto } from 'src/auth-logout/dto/logout.dto';
import { Response } from 'express';
import { IHttpResponse } from 'src/interfaces/http-response.interface';

@Controller('logout')
export class LogoutController {
  constructor(private readonly logoutUseCase: LogoutUseCase) {}

  @Post()
  async logout(@Body() logoutDto: LogoutDto, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.logoutUseCase.logout(
      logoutDto,
    )) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }
}
