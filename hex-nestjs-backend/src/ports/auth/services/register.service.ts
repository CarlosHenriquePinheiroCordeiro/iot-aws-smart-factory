import { Injectable } from '@nestjs/common/decorators/core';
import 'reflect-metadata';
import { RegisterDto } from '../../../domain/auth/dto/register.dto';
import { RegisterUseCase } from '../use-cases';
import { RegisterPort } from '../ports';

@Injectable()
export class RegisterService implements RegisterUseCase {
  constructor(private registerPort: RegisterPort) {}

  register(registerDto: RegisterDto): any {
    const resp = this.registerPort.register(registerDto);
    return resp;
  }
}
