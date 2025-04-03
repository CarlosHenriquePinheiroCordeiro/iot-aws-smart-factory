import { Injectable } from '@nestjs/common/decorators/core';
import { CreateUseCase } from '../ports/in/create.use-case';
import { CreatePort } from '../ports/out/create.port';
import { Organization } from '../../Organization';

@Injectable()
export class CreateService implements CreateUseCase {
  constructor(private createPort: CreatePort) {}

  create(organization: Organization): any {
    return this.createPort.create(organization);
  }
}