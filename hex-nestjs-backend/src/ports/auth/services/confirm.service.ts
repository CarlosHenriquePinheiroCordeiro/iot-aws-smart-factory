import { Injectable } from '@nestjs/common/decorators/core';
import { ConfirmUseCase } from '../use-cases';
import { ConfirmPort } from '../ports';
import { ConfirmDto } from '../../../domain/auth/dto/confirm.dto';

@Injectable()
export class ConfirmService implements ConfirmUseCase {
  constructor(private confirmPort: ConfirmPort) {}

  confirm(confirmDto: ConfirmDto): any {
    return this.confirmPort.confirm(confirmDto);
  }
}
