import { LoginDto } from 'src/auth-login/dto/login.dto';

export abstract class LoginPort {
  abstract login(loginDto: LoginDto): any;
}
