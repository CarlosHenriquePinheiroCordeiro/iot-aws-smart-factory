import { LogoutDto } from 'src/auth-logout/dto/logout.dto';

export abstract class LogoutUseCase {
  abstract logout(logoutDto: LogoutDto): any;
}
