import { AuthLoginApplicationModule } from './application/application.module';
import { AuthLoginAdapterModule } from './adapters/adapter.module';
import { Module } from '@nestjs/common/decorators/modules';
import { AwsCognitoModule } from 'src/aws-cognito/aws-cognito.module';

@Module({
  imports: [
    AuthLoginApplicationModule,
    AuthLoginAdapterModule,
    AwsCognitoModule,
  ],
})
export class AuthLoginModule {}
