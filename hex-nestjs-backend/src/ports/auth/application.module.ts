import { forwardRef } from '@nestjs/common';
import { Services } from './services';
import { Module } from '@nestjs/common/decorators/modules';
import { AuthAdapterModule } from '../../adapters/auth/adapter.module';

@Module({
  imports: [forwardRef(() => AuthAdapterModule)],
  providers: [...Services],
  exports: [...Services],
})
export class AuthApplicationModule {}
