import { forwardRef } from '@nestjs/common';
import { ServicesOut } from './out';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common/decorators/modules';
import { AuthController } from './in/web/auth.controller';
import { AuthApplicationModule } from '../../ports/auth/application.module';
import { AwsCognitoModule } from '../../cloud/aws/cognito/aws-cognito.module';

@Module({
  imports: [
    forwardRef(() => AuthApplicationModule),
    HttpModule,
    AwsCognitoModule,
  ],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
  controllers: [AuthController],
})
export class AuthAdapterModule {}
