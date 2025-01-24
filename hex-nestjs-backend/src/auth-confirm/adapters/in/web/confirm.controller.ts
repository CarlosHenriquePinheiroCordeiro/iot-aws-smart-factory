import { Controller } from '@nestjs/common/decorators/core';
import { Body, Post, Res } from '@nestjs/common/decorators/http';
import { ConfirmUseCase } from 'src/auth-confirm/application/ports/in/confirm.use-case';
import { ConfirmDto } from 'src/auth-confirm/dto/confirm.dto';
import { Response } from 'express';
import { IHttpResponse } from 'src/interfaces/http-response.interface';

@Controller('confirm')
export class ConfirmController {
  constructor(private readonly confirmUseCase: ConfirmUseCase) {}

  @Post()
  async confirm(@Body() confirmDto: ConfirmDto, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.confirmUseCase.confirm(
      confirmDto,
    )) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }
}
