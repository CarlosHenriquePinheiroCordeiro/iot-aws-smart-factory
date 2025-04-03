import { Injectable } from '@nestjs/common/decorators/core';
import { UpdateUseCase } from '../ports/in/update.use-case';
import { UpdatePort } from '../ports/out/update.port';
import { UpdateDto } from '../../dto/update.dto';

@Injectable()
export class UpdateService implements UpdateUseCase {
  constructor(private updatePort: UpdatePort) {}

  update(updateDto: UpdateDto): any {
    return this.updatePort.update(updateDto);
  }
}