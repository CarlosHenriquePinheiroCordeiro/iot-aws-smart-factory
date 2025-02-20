
import { Module } from '@nestjs/common/decorators/modules';
import { AwsCognitoModule } from './aws-cognito/aws-cognito.module';
import { AuthApplicationModule } from './application/application.module';
import { AuthAdapterModule } from './adapters/adapter.module';

@Module({
  imports: [
    AuthApplicationModule,
    AuthAdapterModule,
    AwsCognitoModule,
  ],
})
export class AuthModule {}
