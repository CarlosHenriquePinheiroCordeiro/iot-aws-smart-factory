import { Injectable } from '@nestjs/common/decorators/core';
import { FindByIdUseCase } from '../use-cases';
import { FindByIdPort } from '../ports';


@Injectable()
export class FindByIdService implements FindByIdUseCase {
  constructor(private findByIdPort: FindByIdPort) {}

  findById(): any {
    return this.findByIdPort.findById();
  }
}