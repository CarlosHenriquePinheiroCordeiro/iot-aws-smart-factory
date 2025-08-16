import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsController } from './in/web/organizations.controller';
import { OrganizationEntity } from './out/persistence/organization.entity';
import { OrganizationRepositoryPort } from '../../domain/organizations/ports/outbound';
import { OrganizationRepository } from './out/persistence/organizations.repository';
import { OrganizationsService } from '../../modules/organizations/application/organizations.service';
import {
  CreateOrganizationPort, DeleteOrganizationPort, FindOrganizationByIdPort,
  FindOrganizationsPort, UpdateOrganizationPort
} from '../../domain/organizations/ports/inbound';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationEntity]),
  ],
  controllers: [OrganizationsController],
  providers: [
    { provide: OrganizationRepositoryPort, useClass: OrganizationRepository },

    OrganizationsService,

    { provide: FindOrganizationsPort, useExisting: OrganizationsService },
    { provide: FindOrganizationByIdPort, useExisting: OrganizationsService },
    { provide: CreateOrganizationPort, useExisting: OrganizationsService },
    { provide: UpdateOrganizationPort, useExisting: OrganizationsService },
    { provide: DeleteOrganizationPort, useExisting: OrganizationsService },
  ],
})
export class OrganizationsAdapterModule {}
