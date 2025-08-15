
import { ConfirmCognitoAdapter } from './confirm-cognito.adapter';
import { Provider } from '@nestjs/common/interfaces/modules';
import { LoginCognitoAdapter } from './login-cognito.adapter';
import { LogoutCognitoAdapter } from './logout-cognito.adapter';
import { RegisterCognitoAdapter } from './register-cognito.adapter';
import { ConfirmPort } from '../../../ports/auth/ports';
import { LoginPort } from '../../../ports/auth/ports';
import { LogoutPort } from '../../../ports/auth/ports';
import { RegisterPort } from '../../../ports/auth/ports';

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
