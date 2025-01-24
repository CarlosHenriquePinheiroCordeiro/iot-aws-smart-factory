import { LogoutDto } from 'src/auth-logout/dto/logout.dto';

export abstract class LogoutPort {
  abstract logout(logoutDto: LogoutDto): any;
}
