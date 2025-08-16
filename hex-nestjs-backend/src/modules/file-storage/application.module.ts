import { forwardRef } from '@nestjs/common';
import { Module } from '@nestjs/common/decorators/modules';
import { FileStorageAdapterModule } from '../../adapters/file-storage/adapter.module';

@Module({
  imports: [forwardRef(() => FileStorageAdapterModule)],
})
export class FileStorageApplicationModule {}
