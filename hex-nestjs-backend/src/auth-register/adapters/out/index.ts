import { Provider } from '@nestjs/common';
import { RegisterPort } from '../../application/ports/out/register.port';
import { RegisterCognitoAdapter } from './register-cognito.adapter';

export const ServicesOut: Provider[] = [
  {
    provide: RegisterPort,
    useClass: RegisterCognitoAdapter,
  },
];
