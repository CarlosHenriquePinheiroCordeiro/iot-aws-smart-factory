import { Module } from '@nestjs/common';
import { OrganizationsAdapterModule } from '../../adapters/organizations/adapter.module';

@Module({
  imports: [OrganizationsAdapterModule],
})
export class OrganizationsModule {}
