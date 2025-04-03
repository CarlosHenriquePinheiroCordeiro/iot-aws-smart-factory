import { CreateDto } from '../../../dto/create.dto';

export abstract class CreatePort {
  abstract create(createDto: CreateDto): any;
}