import { Module, forwardRef } from '@nestjs/common';
import { FileStorageController } from './in/web/file-storage.controller';
import { ServicesOut } from './out/s3';
import { FileStorageApplicationModule } from '../../modules/file-storage/application.module';

@Module({
  imports: [
    forwardRef(() => FileStorageApplicationModule),
  ],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
  controllers: [FileStorageController],
})
export class FileStorageAdapterModule {}
