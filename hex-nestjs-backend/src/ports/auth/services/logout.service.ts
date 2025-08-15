import { Injectable } from '@nestjs/common/decorators/core';
import 'reflect-metadata';
import { LogoutUseCase } from '../use-cases';
import { LogoutPort } from '../ports';

@Injectable()
export class LogoutService implements LogoutUseCase {
  constructor(private logoutPort: LogoutPort) {}

  logout(token: string): any {
    const resp = this.logoutPort.logout(token);
    return resp;
  }
}
