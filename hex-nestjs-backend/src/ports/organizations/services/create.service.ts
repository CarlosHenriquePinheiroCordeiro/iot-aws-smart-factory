import { Injectable } from '@nestjs/common/decorators/core';
import { CreateUseCase } from '../use-cases';
import { CreatePort } from '../ports';
import { Organization } from '../../../domain/organizations/Organization';

@Injectable()
export class CreateService implements CreateUseCase {
  constructor(private createPort: CreatePort) {}

  create(organization: Organization): any {
    return this.createPort.create(organization);
  }
}