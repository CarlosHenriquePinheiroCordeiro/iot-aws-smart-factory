import { Provider } from '@nestjs/common';
import { ConfirmUseCase } from '../ports/in/confirm.use-case';
import { ConfirmService } from './confirm.service';
import { LoginUseCase } from '../ports/in/login.use-case';
import { LoginService } from './login.service';
import { RegisterUseCase } from '../ports/in/register.use-case';
import { RegisterService } from './register.service';
import { LogoutUseCase } from '../ports/in/logout.use-case';
import { LogoutService } from './logout.service';

export const Services: Provider[] = [
  {
    provide: ConfirmUseCase,
    useClass: ConfirmService,
  },
  {
    provide: LoginUseCase,
    useClass: LoginService,
  },
  {
    provide: RegisterUseCase,
    useClass: RegisterService,
  },
  {
    provide: LogoutUseCase,
    useClass: LogoutService,
  },
];
