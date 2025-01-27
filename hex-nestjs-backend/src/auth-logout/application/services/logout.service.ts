import { Injectable } from '@nestjs/common/decorators/core';
import { LogoutUseCase } from '../ports/in/logout.use-case';
import { LogoutPort } from '../ports/out/logout.port';

@Injectable()
export class LogoutService implements LogoutUseCase {
  constructor(private logoutPort: LogoutPort) {}

  logout(token: string): any {
    const resp = this.logoutPort.logout(token);
    return resp;
  }
}
