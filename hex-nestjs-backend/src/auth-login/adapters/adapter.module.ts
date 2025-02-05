import { forwardRef } from '@nestjs/common';
import { AuthLoginApplicationModule } from '../application/application.module';
import { Module } from '@nestjs/common/decorators/modules';
import { AwsCognitoModule } from '../../aws-cognito/aws-cognito.module';
import { LoginController } from '../../auth-login/adapters/in/web/login.controller';
import { ServicesOut } from './out';

@Module({
  imports: [forwardRef(() => AuthLoginApplicationModule), AwsCognitoModule],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
  controllers: [LoginController],
})
export class AuthLoginAdapterModule {}
