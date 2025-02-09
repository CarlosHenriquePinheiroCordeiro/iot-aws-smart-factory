import { Injectable } from '@nestjs/common/decorators/core';
import { RegisterUseCase } from '../ports/in/register.use-case';
import { RegisterPort } from '../ports/out/register.port';
import { RegisterDto } from '../../dto/register.dto';
import 'reflect-metadata';

@Injectable()
export class RegisterService implements RegisterUseCase {
  constructor(private registerPort: RegisterPort) {}

  register(registerDto: RegisterDto): any {
    const resp = this.registerPort.register(registerDto);
    return resp;
  }
}
