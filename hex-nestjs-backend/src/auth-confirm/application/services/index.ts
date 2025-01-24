import { Provider } from '@nestjs/common';
import { ConfirmUseCase } from '../ports/in/confirm.use-case';
import { ConfirmService } from './confirm.service';

export const Services: Provider[] = [
  {
    provide: ConfirmUseCase,
    useClass: ConfirmService,
  },
];
