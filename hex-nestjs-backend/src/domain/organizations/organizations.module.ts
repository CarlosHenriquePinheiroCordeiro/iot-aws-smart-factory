import { Module } from '@nestjs/common/decorators/modules';
import { OrganizationsApplicationModule } from '../../modules/organizations/application.module';
import { OrganizationsAdapterModule } from '../../adapters/organizations/adapter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from '../../db/entities/organization.entity';

@Module({
  imports: [
    OrganizationsApplicationModule,
    OrganizationsAdapterModule,
    TypeOrmModule.forFeature([OrganizationEntity])
  ]
})
export class OrganizationsModule {}