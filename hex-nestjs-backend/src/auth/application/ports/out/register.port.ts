import { RegisterDto } from "../../../dto/register.dto";

export abstract class RegisterPort {
  abstract register(registerDto: RegisterDto): any;
}
