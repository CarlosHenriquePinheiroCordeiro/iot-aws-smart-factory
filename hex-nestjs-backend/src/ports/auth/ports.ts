import { ConfirmDto } from "../../domain/auth/dto/confirm.dto";
import { LoginDto } from "../../domain/auth/dto/login.dto";
import { RegisterDto } from "../../domain/auth/dto/register.dto";

export abstract class ConfirmPort {
  abstract confirm(confirmDto: ConfirmDto): any;
}

export abstract class LoginPort {
  abstract login(loginDto: LoginDto): any;
}

export abstract class LogoutPort {
    abstract logout(token: string): any;
}

export abstract class RegisterPort {
  abstract register(registerDto: RegisterDto): any;
}
