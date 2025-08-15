import { Provider } from '@nestjs/common/interfaces/modules';
import { OrganizationRepository } from './organizations.repository';

export const OrganizationsProvider: Provider[] = [
    OrganizationRepository
]