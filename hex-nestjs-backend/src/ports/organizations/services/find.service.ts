import { Injectable } from '@nestjs/common/decorators/core';
import { FindUseCase } from '../use-cases';
import { FindPort } from '../ports';


@Injectable()
export class FindService implements FindUseCase {
  constructor(private findPort: FindPort) {}

  find(): any {
    return this.findPort.find();
  }
}