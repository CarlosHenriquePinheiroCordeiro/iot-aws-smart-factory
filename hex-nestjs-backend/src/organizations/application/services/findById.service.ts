import { Injectable } from '@nestjs/common/decorators/core';
import { FindByIdUseCase } from '../ports/in/findById.use-case';
import { FindByIdPort } from '../ports/out/findById.port';


@Injectable()
export class FindByIdService implements FindByIdUseCase {
  constructor(private findByIdPort: FindByIdPort) {}

  findById(): any {
    return this.findByIdPort.findById();
  }
}