import { forwardRef } from '@nestjs/common';
import { Services } from './services';
import { AuthConfirmAdapterModule } from '../adapters/adapter.module';
import { Module } from '@nestjs/common/decorators/modules';

@Module({
  imports: [forwardRef(() => AuthConfirmAdapterModule)],
  providers: [...Services],
  exports: [...Services],
})
export class AuthConfirmApplicationModule {}
