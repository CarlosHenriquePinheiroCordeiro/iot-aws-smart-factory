import { Provider } from '@nestjs/common';
import { RegisterPort } from 'src/auth-register/application/ports/out/register.port';
import { RegisterCognitoAdapter } from './register-cognito.adapter';

export const ServicesOut: Provider[] = [
  {
    provide: RegisterPort,
    useClass: RegisterCognitoAdapter,
  },
];
