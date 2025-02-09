import { LoginDto } from "../../../dto/login.dto";

export abstract class LoginUseCase {
  abstract login(loginDto: LoginDto): any;
}
