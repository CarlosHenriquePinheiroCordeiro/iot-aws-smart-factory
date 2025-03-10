import { Provider } from '@nestjs/common/interfaces/modules';
import { LoginPort } from '../../application/ports/out/login.port';
import { LoginCognitoAdapter } from './login-cognito.adapter';
export const ServicesOut: Provider[] = [
  {
    provide: LoginPort,
    useClass: LoginCognitoAdapter,
  },
];
