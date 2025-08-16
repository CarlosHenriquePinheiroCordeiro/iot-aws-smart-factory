import { Organization } from '../Organization';

export abstract class OrganizationRepositoryPort {
  abstract find(): Promise<Organization[]>;
  abstract findById(id: string): Promise<Organization | null>;
  abstract save(worker: Organization): Promise<Organization>;
  abstract update(id: string, patch: Partial<Organization>): Promise<Organization>;
  abstract delete(id: string): Promise<void>;
}
