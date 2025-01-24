import { RegisterDto } from 'src/auth-register/dto/register.dto';

export abstract class RegisterUseCase {
  abstract register(registerDto: RegisterDto): any;
}
