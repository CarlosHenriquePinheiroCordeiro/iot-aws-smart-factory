import { ConfirmDto } from 'src/auth-confirm/dto/confirm.dto';

export abstract class ConfirmPort {
  abstract confirm(confirmDto: ConfirmDto): any;
}
