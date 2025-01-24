import { ConfirmDto } from 'src/auth-confirm/dto/confirm.dto';

export abstract class ConfirmUseCase {
  abstract confirm(confirmDto: ConfirmDto): any;
}
