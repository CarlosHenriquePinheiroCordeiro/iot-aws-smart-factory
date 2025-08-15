import { Module } from '@nestjs/common/decorators/modules';
import { OrganizationsApplicationModule } from './application/application.module';
import { OrganizationsAdapterModule } from './adapters/adapter.module';
import { OrganizationRepository } from './repository/organizations.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from '../db/entities/organization.entity';

@Module({
  imports: [
    OrganizationsApplicationModule,
    OrganizationsAdapterModule,
    TypeOrmModule.forFeature([OrganizationEntity])
  ]
})
export class OrganizationsModule {}