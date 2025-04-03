import { UpdateDto } from "../../../dto/update.dto"

export abstract class UpdateUseCase {
  abstract update(updateDto: UpdateDto): any;
}