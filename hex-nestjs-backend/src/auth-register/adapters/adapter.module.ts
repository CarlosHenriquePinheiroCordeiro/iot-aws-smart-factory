import { forwardRef } from '@nestjs/common';
import { ServicesOut } from './out';
import { AuthRegisterApplicationModule } from '../application/application.module';
import { RegisterController } from './in/web/register.controller';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common/decorators/modules';
import { AwsCognitoModule } from '../../aws-cognito/aws-cognito.module';

@Module({
  imports: [
    forwardRef(() => AuthRegisterApplicationModule),
    HttpModule,
    AwsCognitoModule,
  ],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
  controllers: [RegisterController],
})
export class AuthRegisterAdapterModule {}
