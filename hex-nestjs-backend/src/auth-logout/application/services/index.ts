import { Provider } from '@nestjs/common';
import { LogoutUseCase } from '../ports/in/logout.use-case';
import { LogoutService } from './logout.service';

export const Services: Provider[] = [
  {
    provide: LogoutUseCase,
    useClass: LogoutService,
  },
];
