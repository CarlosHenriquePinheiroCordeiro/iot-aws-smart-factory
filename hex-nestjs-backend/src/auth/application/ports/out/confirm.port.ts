import { ConfirmDto } from '../../../dto/confirm.dto';

export abstract class ConfirmPort {
  abstract confirm(confirmDto: ConfirmDto): any;
}
