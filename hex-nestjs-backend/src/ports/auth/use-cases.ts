import { ConfirmDto } from "../../domain/auth/dto/confirm.dto";
import { LoginDto } from "../../domain/auth/dto/login.dto";
import { RegisterDto } from "../../domain/auth/dto/register.dto";

export abstract class ConfirmUseCase {
  abstract confirm(confirmDto: ConfirmDto): any;
}

export abstract class LoginUseCase {
  abstract login(loginDto: LoginDto): any;
}

export abstract class LogoutUseCase {
    abstract logout(token: string): any;
}

export abstract class RegisterUseCase {
  abstract register(registerDto: RegisterDto): any;
}
