import { Injectable } from '@nestjs/common/decorators/core';
import { FindPort } from '../../../ports/organizations/ports';
import { OrganizationRepository } from '../../../repository/organizations/organizations.repository';

@Injectable()
export class FindAdapter extends FindPort {

  constructor(private readonly organizationRepository: OrganizationRepository) {
      super();
    }

  async find(): Promise<any> {
    return this.organizationRepository.find()
  }


}