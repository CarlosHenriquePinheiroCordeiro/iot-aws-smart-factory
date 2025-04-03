import { CreateDto } from "../../../dto/create.dto"

export abstract class CreateUseCase {
  abstract create(createDto: CreateDto): any;
}