import { DeleteDto } from "../../../dto/delete.dto"

export abstract class DeleteUseCase {
  abstract delete(deleteDto: DeleteDto): any;
}