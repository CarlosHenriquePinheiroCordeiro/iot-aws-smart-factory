import { Provider } from '@nestjs/common';
import { LogoutPort } from 'src/auth-logout/application/ports/out/logout.port';
import { LogoutCognitoAdapter } from './logout-cognito.adapter';

export const ServicesOut: Provider[] = [
  {
    provide: LogoutPort,
    useClass: LogoutCognitoAdapter,
  },
];
