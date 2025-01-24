import { AuthRegisterApplicationModule } from './application/application.module';
import { AuthRegisterAdapterModule } from './adapters/adapter.module';
import { Module } from '@nestjs/common/decorators/modules';
import { AwsCognitoModule } from 'src/aws-cognito/aws-cognito.module';

@Module({
  imports: [
    AuthRegisterApplicationModule,
    AuthRegisterAdapterModule,
    AwsCognitoModule,
  ],
})
export class AuthRegisterModule {}
