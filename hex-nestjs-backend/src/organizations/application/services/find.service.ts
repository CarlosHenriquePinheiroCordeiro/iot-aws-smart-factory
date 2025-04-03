import { Injectable } from '@nestjs/common/decorators/core';
import { FindUseCase } from '../ports/in/find.use-case';
import { FindPort } from '../ports/out/find.port';


@Injectable()
export class FindService implements FindUseCase {
  constructor(private findPort: FindPort) {}

  find(): any {
    return this.findPort.find();
  }
}