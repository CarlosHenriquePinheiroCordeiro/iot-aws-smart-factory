import { Module } from '@nestjs/common/decorators/modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AwsCognitoModule } from './aws-cognito/aws-cognito.module';
import { AuthRegisterModule } from './auth-register/auth.module';
import { AuthConfirmModule } from './auth-confirm/confirm.module';
import { AuthLoginModule } from './auth-login/login.module';
import { AuthLogoutModule } from './auth-logout/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthRegisterModule,
    AuthConfirmModule,
    AuthLoginModule,
    AuthLogoutModule,
    AwsCognitoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
