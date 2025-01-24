import { Provider } from '@nestjs/common';
import { RegisterUseCase } from '../ports/in/register.use-case';
import { RegisterService } from './register.service';

export const Services: Provider[] = [
  {
    provide: RegisterUseCase,
    useClass: RegisterService,
  },
];
