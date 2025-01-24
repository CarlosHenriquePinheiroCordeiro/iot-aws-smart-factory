import { Injectable } from '@nestjs/common/decorators/core';
import { ConfirmUseCase } from '../ports/in/confirm.use-case';
import { ConfirmPort } from '../ports/out/confirm.port';
import { ConfirmDto } from 'src/auth-confirm/dto/confirm.dto';

@Injectable()
export class ConfirmService implements ConfirmUseCase {
  constructor(private confirmPort: ConfirmPort) {}

  confirm(confirmDto: ConfirmDto): any {
    return this.confirmPort.confirm(confirmDto);
  }
}
