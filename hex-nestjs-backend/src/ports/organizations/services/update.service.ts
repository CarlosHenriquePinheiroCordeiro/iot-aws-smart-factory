import { Injectable } from '@nestjs/common/decorators/core';
import { UpdateDto } from '../../../domain/organizations/dto/update.dto';
import { UpdateUseCase } from '../use-cases';
import { UpdatePort } from '../ports';

@Injectable()
export class UpdateService implements UpdateUseCase {
  constructor(private updatePort: UpdatePort) {}

  update(updateDto: UpdateDto): any {
    return this.updatePort.update(updateDto);
  }
}