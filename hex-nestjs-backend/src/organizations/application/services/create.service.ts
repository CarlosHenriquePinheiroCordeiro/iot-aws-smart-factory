import { Injectable } from '@nestjs/common/decorators/core';
import { CreateUseCase } from '../ports/in/create.use-case';
import { CreatePort } from '../ports/out/create.port';
import { CreateDto } from '../../dto/create.dto';

@Injectable()
export class CreateService implements CreateUseCase {
  constructor(private createPort: CreatePort) {}

  create(createDto: CreateDto): any {
    return this.createPort.create(createDto);
  }
}