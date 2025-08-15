import { Provider } from '@nestjs/common';
import { ConfirmUseCase } from '../use-cases';
import { ConfirmService } from './confirm.service';
import { LoginUseCase } from '../use-cases';
import { LoginService } from './login.service';
import { RegisterUseCase } from '../use-cases';
import { RegisterService } from './register.service';
import { LogoutUseCase } from '../use-cases';
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
