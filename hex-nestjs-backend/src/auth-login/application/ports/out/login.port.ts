import { LoginDto } from "../../../dto/login.dto";

export abstract class LoginPort {
  abstract login(loginDto: LoginDto): any;
}
