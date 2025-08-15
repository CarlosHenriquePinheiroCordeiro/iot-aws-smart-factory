import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesOut } from './out';
import { OrganizationsController } from './in/web/organizations.controller';
import { OrganizationEntity } from '../../db/entities/organization.entity';
import { OrganizationsApplicationModule } from '../../modules/organizations/application.module';
import { OrganizationsProvider } from '../../repository/organizations/provider';

@Module({
  imports: [
    forwardRef(() => OrganizationsApplicationModule),
    TypeOrmModule.forFeature([OrganizationEntity]),
  ],
  providers: [...ServicesOut, ...OrganizationsProvider],
  exports: [...ServicesOut, ...OrganizationsProvider, TypeOrmModule],
  controllers: [OrganizationsController],
})
export class OrganizationsAdapterModule {}
