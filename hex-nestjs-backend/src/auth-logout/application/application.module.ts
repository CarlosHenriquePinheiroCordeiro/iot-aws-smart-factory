import { forwardRef } from '@nestjs/common';
import { Services } from './services';
import { AuthLogoutAdapterModule } from '../adapters/adapter.module';
import { Module } from '@nestjs/common/decorators/modules';

@Module({
  imports: [forwardRef(() => AuthLogoutAdapterModule)],
  providers: [...Services],
  exports: [...Services],
})
export class AuthLogoutApplicationModule {}
