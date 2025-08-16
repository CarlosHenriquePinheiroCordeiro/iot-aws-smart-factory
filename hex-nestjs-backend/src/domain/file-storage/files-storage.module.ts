import { Module } from '@nestjs/common/decorators/modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from '../../adapters/organizations/out/persistence/organization.entity';
import { FileStorageApplicationModule } from '../../modules/file-storage/application.module';
import { FileStorageAdapterModule } from '../../adapters/file-storage/adapter.module';

@Module({
  imports: [
    FileStorageApplicationModule,
    FileStorageAdapterModule,
  ]
})
export class FileStorageModule {}