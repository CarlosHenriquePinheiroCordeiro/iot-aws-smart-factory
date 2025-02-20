import { forwardRef } from '@nestjs/common';
import { ServicesOut } from './out';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common/decorators/modules';
import { AwsCognitoModule } from '../aws-cognito/aws-cognito.module';
import { AuthController } from './in/web/auth.controller';
import { AuthApplicationModule } from '../application/application.module';

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
