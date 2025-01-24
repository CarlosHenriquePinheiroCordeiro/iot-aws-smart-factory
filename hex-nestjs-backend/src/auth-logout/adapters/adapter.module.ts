import { forwardRef } from '@nestjs/common';
import { ServicesOut } from './out';
import { AuthLogoutApplicationModule } from '../application/application.module';
import { LogoutController } from './in/web/logout.controller';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common/decorators/modules';
import { AwsCognitoModule } from 'src/aws-cognito/aws-cognito.module';

@Module({
  imports: [
    forwardRef(() => AuthLogoutApplicationModule),
    HttpModule,
    AwsCognitoModule,
  ],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
  controllers: [LogoutController],
})
export class AuthLogoutAdapterModule {}
