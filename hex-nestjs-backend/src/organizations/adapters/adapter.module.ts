import { forwardRef } from '@nestjs/common';
import { ServicesOut } from './out';
import { Module } from '@nestjs/common/decorators/modules';
import { OrganizationsController } from './in/web/organizations.controller';
import { OrganizationsApplicationModule } from '../application/application.module';
import { OrganizationsProvider } from '../repository/provider';

@Module({
  imports: [
    forwardRef(() => OrganizationsApplicationModule)
  ],
  providers: [...ServicesOut, ...OrganizationsProvider],
  exports: [...ServicesOut],
  controllers: [OrganizationsController],
})
export class OrganizationsAdapterModule {}