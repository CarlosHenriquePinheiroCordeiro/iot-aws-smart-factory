import { forwardRef } from '@nestjs/common';
import { ServicesOut } from './out';
import { AuthConfirmApplicationModule } from '../application/application.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common/decorators/modules';
import { AwsCognitoModule } from '../../aws-cognito/aws-cognito.module';
import { ConfirmController } from './in/web/confirm.controller';

@Module({
  imports: [
    forwardRef(() => AuthConfirmApplicationModule),
    HttpModule,
    AwsCognitoModule,
  ],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
  controllers: [ConfirmController],
})
export class AuthConfirmAdapterModule {}
