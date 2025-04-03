import { forwardRef } from '@nestjs/common';
import { ServicesOut } from './out';
import { Module } from '@nestjs/common/decorators/modules';
import { OrganizationsController } from './in/web/organizations.controller';
import { OrganizationsApplicationModule } from '../application/application.module';

@Module({
  imports: [
    forwardRef(() => OrganizationsApplicationModule),
  ],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
  controllers: [OrganizationsController],
})
export class OrganizationsAdapterModule {}