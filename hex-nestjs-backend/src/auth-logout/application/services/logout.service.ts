import { Injectable } from '@nestjs/common/decorators/core';
import { LogoutUseCase } from '../ports/in/logout.use-case';
import { LogoutPort } from '../ports/out/logout.port';
import { LogoutDto } from 'src/auth-logout/dto/logout.dto';

@Injectable()
export class LogoutService implements LogoutUseCase {
  constructor(private logoutPort: LogoutPort) {}

  logout(logoutDto: LogoutDto): any {
    const resp = this.logoutPort.logout(logoutDto);
    return resp;
  }
}
