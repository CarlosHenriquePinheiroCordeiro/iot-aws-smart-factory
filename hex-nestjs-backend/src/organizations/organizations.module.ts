import { Module } from '@nestjs/common/decorators/modules';
import { OrganizationsApplicationModule } from './application/application.module';
import { OrganizationsAdapterModule } from './adapters/adapter.module';

@Module({
  imports: [
    OrganizationsApplicationModule,
    OrganizationsAdapterModule,
  ],
})
export class OrganizationsModule {}