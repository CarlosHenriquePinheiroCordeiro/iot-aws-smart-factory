import { Controller } from '@nestjs/common/decorators/core';
import { Body, Post, Res } from '@nestjs/common/decorators/http';
import { RegisterUseCase } from 'src/auth-register/application/ports/in/register.use-case';
import { RegisterDto } from 'src/auth-register/dto/register.dto';
import { Response } from 'express';
import { IHttpResponse } from 'src/interfaces/http-response.interface';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post()
  async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.registerUseCase.register(
      registerDto,
    )) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }
}
