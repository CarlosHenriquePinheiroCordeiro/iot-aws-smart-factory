import { Injectable } from '@nestjs/common/decorators/core';
import { FindPort } from '../../application/ports/out/find.port';
import { OrganizationRepository } from '../../repository/organizations.repository';

@Injectable()
export class FindAdapter extends FindPort {

  constructor(private readonly organizationRepository: OrganizationRepository) {
      super();
    }

  async find(): Promise<any> {
    return this.organizationRepository.find()
  }


}