
import { ConfirmPort } from '../../application/ports/out/confirm.port';
import { LoginPort } from '../../application/ports/out/login.port';
import { LogoutPort } from '../../application/ports/out/logout.port';
import { RegisterPort } from '../../application/ports/out/register.port';
import { ConfirmCognitoAdapter } from './confirm-cognito.adapter';
import { Provider } from '@nestjs/common/interfaces/modules';
import { LoginCognitoAdapter } from './login-cognito.adapter';
import { LogoutCognitoAdapter } from './logout-cognito.adapter';
import { RegisterCognitoAdapter } from './register-cognito.adapter';

export const ServicesOut: Provider[] = [
  {
    provide: ConfirmPort,
    useClass: ConfirmCognitoAdapter,
  },
  {
    provide: LoginPort,
    useClass: LoginCognitoAdapter,
  },
  {
    provide: LogoutPort,
    useClass: LogoutCognitoAdapter,
  },
  {
    provide: RegisterPort,
    useClass: RegisterCognitoAdapter,
  },
];
