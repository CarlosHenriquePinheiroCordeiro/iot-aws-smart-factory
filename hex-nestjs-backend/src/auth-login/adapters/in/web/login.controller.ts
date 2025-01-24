import { Controller } from '@nestjs/common/decorators/core';
import { Body, Post, Res } from '@nestjs/common/decorators/http';
import { HttpResponse } from 'aws-sdk';
import { LoginUseCase } from 'src/auth-login/application/ports/in/login.use-case';
import { LoginDto } from 'src/auth-login/dto/login.dto';
import { IHttpResponse } from 'src/interfaces/http-response.interface';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post()
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.loginUseCase.login(
      loginDto,
    )) as Partial<HttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }
}
