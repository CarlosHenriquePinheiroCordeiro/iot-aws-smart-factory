import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesOut } from './out';
import { OrganizationsController } from './in/web/organizations.controller';
import { OrganizationsApplicationModule } from '../application/application.module';
import { OrganizationsProvider } from '../repository/provider';
import { OrganizationEntity } from '../../db/entities/organization.entity';

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
