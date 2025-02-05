import { Injectable } from '@nestjs/common/decorators/core';
import { LoginUseCase } from '../ports/in/login.use-case';
import { LoginPort } from '../ports/out/login.port';
import { LoginDto } from '../../dto/login.dto';

@Injectable()
export class LoginService implements LoginUseCase {
  constructor(private loginPort: LoginPort) {}

  login(loginDto: LoginDto): any {
    const resp = this.loginPort.login(loginDto);
    return resp;
  }
}
