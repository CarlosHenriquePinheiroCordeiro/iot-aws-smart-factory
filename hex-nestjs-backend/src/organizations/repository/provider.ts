import { Provider } from '@nestjs/common/interfaces/modules';
import { OrganizationRepository } from './organizations.repository';
import { OrganizationEntity } from '../../db/entities/organization.entity';

export const OrganizationsProvider: Provider[] = [
    OrganizationRepository,
    {
        provide: "OrganizationEntityRepository",
        useClass: OrganizationEntity,
    }
]