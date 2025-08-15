import { forwardRef } from '@nestjs/common';
import { Services } from '../../ports/organizations/services';
import { OrganizationsAdapterModule } from '../../adapters/organizations/adapter.module';
import { Module } from '@nestjs/common/decorators/modules';

@Module({
  imports: [forwardRef(() => OrganizationsAdapterModule)],
  providers: [...Services],
  exports: [...Services],
})
export class OrganizationsApplicationModule {}
