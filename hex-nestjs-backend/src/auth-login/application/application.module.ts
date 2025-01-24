import { forwardRef } from '@nestjs/common';
import { Services } from './services';
import { AuthLoginAdapterModule } from '../adapters/adapter.module';
import { Module } from '@nestjs/common/decorators/modules';

@Module({
  imports: [forwardRef(() => AuthLoginAdapterModule)],
  providers: [...Services],
  exports: [...Services],
})
export class AuthLoginApplicationModule {}
