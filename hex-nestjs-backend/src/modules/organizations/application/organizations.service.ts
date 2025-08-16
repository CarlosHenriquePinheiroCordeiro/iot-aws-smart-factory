import { Injectable } from '@nestjs/common';
import { Organization } from '../../../domain/organizations/Organization';
import { OrganizationRepositoryPort } from '../../../domain/organizations/ports/outbound';
import {
  CreateOrganizationPort, DeleteOrganizationPort, FindOrganizationByIdPort,
  FindOrganizationsPort, UpdateOrganizationPort
} from '../../../domain/organizations/ports/inbound';

@Injectable()
export class OrganizationsService implements FindOrganizationsPort, FindOrganizationByIdPort, CreateOrganizationPort, UpdateOrganizationPort, DeleteOrganizationPort {

  constructor(private readonly repo: OrganizationRepositoryPort) {}

  async find() { return this.repo.find(); }

  async findById(id: string) {
    const found = await this.repo.findById(id);
    return found;
  }

  async create(worker: Organization) {
    return this.repo.save(worker);
  }

  async update(input: Partial<Organization> & { id: string }) {
    await this.ensureExists(input.id);
    return this.repo.update(input.id, input);
  }

  async delete(input: { id: string }) {
    await this.ensureExists(input.id);
    await this.repo.delete(input.id);
  }

  private async ensureExists(id: string) {
    const exists = await this.repo.findById(id);
    return exists;
  }


}
