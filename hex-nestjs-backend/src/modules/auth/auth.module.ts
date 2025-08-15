
import { Module } from '@nestjs/common/decorators/modules';
import { AwsCognitoModule } from '../../cloud/aws/cognito/aws-cognito.module';
import { AuthApplicationModule } from '../../ports/auth/application.module';
import { AuthAdapterModule } from '../../adapters/auth/adapter.module';

@Module({
  imports: [
    AuthApplicationModule,
    AuthAdapterModule,
    AwsCognitoModule,
  ],
})
export class AuthModule {}
