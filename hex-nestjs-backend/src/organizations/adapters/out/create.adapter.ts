import { Injectable } from '@nestjs/common/decorators/core';
import { CreatePort } from '../../application/ports/out/create.port';
import { OrganizationRepository } from '../../repository/organizations.repository';
import { Organization } from '../../Organization';

@Injectable()
export class CreateAdapter extends CreatePort {

  constructor(private readonly organizationRepository: OrganizationRepository) {
    super();
  }

  async create(organization: Organization): Promise<any> {

    //this.organizationRepository.save()
  }


}