import { Injectable } from '@nestjs/common/decorators/core';
import { Organization } from '../../../domain/organizations/Organization';
import { OrganizationRepository } from '../../../repository/organizations/organizations.repository';
import { CreatePort } from '../../../ports/organizations/ports';

@Injectable()
export class CreateAdapter extends CreatePort {

  constructor(private readonly organizationRepository: OrganizationRepository) {
    super();
  }

  async create(organization: Organization): Promise<any> {
    return this.organizationRepository.save(organization)
  }


}