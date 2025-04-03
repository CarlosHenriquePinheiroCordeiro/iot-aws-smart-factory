import { Module } from '@nestjs/common/decorators/modules';
import { OrganizationsApplicationModule } from './application/application.module';
import { OrganizationsAdapterModule } from './adapters/adapter.module';
import { OrganizationRepository } from './repository/organizations.repository';

@Module({
  imports: [
    OrganizationsApplicationModule,
    OrganizationsAdapterModule,
  ]
})
export class OrganizationsModule {}