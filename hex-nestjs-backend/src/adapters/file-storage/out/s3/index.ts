import { Provider } from '@nestjs/common/interfaces/modules';
import { GetPublicUrlPort, DeleteObjectPort, GeneratePresignedPutUrlPort, ObjectExistsPort } from '../../../../ports/file-storage/ports';
import { S3FileStorageAdapter } from './s3-file-storage.adapter';

export const ServicesOut: Provider[] = [
  {
    provide: GeneratePresignedPutUrlPort,
    useClass: S3FileStorageAdapter,
  },
  {
    provide: GetPublicUrlPort,
    useClass: S3FileStorageAdapter,
  },
  {
    provide: DeleteObjectPort,
    useClass: S3FileStorageAdapter,
  },
  {
    provide: ObjectExistsPort,
    useClass: S3FileStorageAdapter,
  },
]