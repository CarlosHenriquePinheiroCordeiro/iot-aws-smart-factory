import { ConfirmPort } from '../../application/ports/out/confirm.port';
import { ConfirmCognitoAdapter } from './confirm-cognito.adapter';
import { Provider } from '@nestjs/common/interfaces/modules';

export const ServicesOut: Provider[] = [
  {
    provide: ConfirmPort,
    useClass: ConfirmCognitoAdapter,
  },
];
