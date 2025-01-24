import { Module } from '@nestjs/common/decorators/modules';
import { AwsCognitoService } from './aws-cognito.service';

@Module({
  providers: [AwsCognitoService],
  exports: [AwsCognitoService],
})
export class AwsCognitoModule {}
