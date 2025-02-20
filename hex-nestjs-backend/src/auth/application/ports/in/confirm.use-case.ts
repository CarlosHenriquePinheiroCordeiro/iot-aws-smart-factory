import { ConfirmDto } from "../../../dto/confirm.dto";

export abstract class ConfirmUseCase {
  abstract confirm(confirmDto: ConfirmDto): any;
}
