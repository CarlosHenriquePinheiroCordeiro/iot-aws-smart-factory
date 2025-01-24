import { AuthConfirmApplicationModule } from './application/application.module';
import { AuthConfirmAdapterModule } from './adapters/adapter.module';
import { Module } from '@nestjs/common/decorators/modules';
import { AwsCognitoModule } from 'src/aws-cognito/aws-cognito.module';

@Module({
  imports: [
    AuthConfirmApplicationModule,
    AuthConfirmAdapterModule,
    AwsCognitoModule,
  ],
})
export class AuthConfirmModule {}
