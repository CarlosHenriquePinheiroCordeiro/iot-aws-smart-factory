import { DeleteDto } from '../../../dto/delete.dto';

export abstract class DeletePort {
  abstract delete(deleteDto: DeleteDto): any;
}