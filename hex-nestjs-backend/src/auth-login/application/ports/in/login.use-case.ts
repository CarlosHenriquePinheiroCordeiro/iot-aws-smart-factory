import { LoginDto } from 'src/auth-login/dto/login.dto';

export abstract class LoginUseCase {
  abstract login(loginDto: LoginDto): any;
}
