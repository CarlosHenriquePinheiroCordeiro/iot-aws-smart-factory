import { forwardRef } from '@nestjs/common';
import { Services } from './services';
import { AuthAdapterModule } from '../adapters/adapter.module';
import { Module } from '@nestjs/common/decorators/modules';

@Module({
  imports: [forwardRef(() => AuthAdapterModule)],
  providers: [...Services],
  exports: [...Services],
})
export class AuthApplicationModule {}
