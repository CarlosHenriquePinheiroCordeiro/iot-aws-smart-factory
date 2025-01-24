import { AuthLogoutApplicationModule } from './application/application.module';
import { AuthLogoutAdapterModule } from './adapters/adapter.module';
import { Module } from '@nestjs/common/decorators/modules';
import { AwsCognitoModule } from 'src/aws-cognito/aws-cognito.module';

@Module({
  imports: [
    AuthLogoutApplicationModule,
    AuthLogoutAdapterModule,
    AwsCognitoModule,
  ],
})
export class AuthLogoutModule {}
