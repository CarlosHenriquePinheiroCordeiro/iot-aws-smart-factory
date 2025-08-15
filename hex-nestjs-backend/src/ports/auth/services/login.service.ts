import { Injectable } from '@nestjs/common/decorators/core';
import 'reflect-metadata';
import { LoginDto } from '../../../domain/auth/dto/login.dto';
import { LoginUseCase } from '../use-cases';
import { LoginPort } from '../ports';

@Injectable()
export class LoginService implements LoginUseCase {
  constructor(private loginPort: LoginPort) {}

  login(loginDto: LoginDto): any {
    const resp = this.loginPort.login(loginDto);
    return resp;
  }
}
