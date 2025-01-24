import { forwardRef } from '@nestjs/common';
import { Services } from './services';
import { AuthRegisterAdapterModule } from '../adapters/adapter.module';
import { Module } from '@nestjs/common/decorators/modules';

@Module({
  imports: [forwardRef(() => AuthRegisterAdapterModule)],
  providers: [...Services],
  exports: [...Services],
})
export class AuthRegisterApplicationModule {}
