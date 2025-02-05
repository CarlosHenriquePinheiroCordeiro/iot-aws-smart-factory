import { Controller } from '@nestjs/common/decorators/core';
import { Body, Patch, Res } from '@nestjs/common/decorators/http';
import { ConfirmUseCase } from '../../../application/ports/in/confirm.use-case';
import { ConfirmDto } from '../../../dto/confirm.dto';
import { Response } from 'express';
import { IHttpResponse } from '../../../../interfaces/http-response.interface';

@Controller('confirm')
export class ConfirmController {
  constructor(private readonly confirmUseCase: ConfirmUseCase) {}

  @Patch()
  async confirm(@Body() confirmDto: ConfirmDto, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.confirmUseCase.confirm(
      confirmDto,
    )) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }
}
