import { UpdateDto } from '../../../dto/update.dto';

export abstract class UpdatePort {
  abstract update(updateDto: UpdateDto): any;
}