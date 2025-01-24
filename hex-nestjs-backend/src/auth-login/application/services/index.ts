import { Provider } from '@nestjs/common';
import { LoginUseCase } from '../ports/in/login.use-case';
import { LoginService } from './login.service';

export const Services: Provider[] = [
  {
    provide: LoginUseCase,
    useClass: LoginService,
  },
];
