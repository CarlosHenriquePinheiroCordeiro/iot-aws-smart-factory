import { RegisterDto } from 'src/auth-register/dto/register.dto';

export abstract class RegisterPort {
  abstract register(registerDto: RegisterDto): any;
}
