import { RegisterDto } from "../../../dto/register.dto";

export abstract class RegisterUseCase {
  abstract register(registerDto: RegisterDto): any;
}
