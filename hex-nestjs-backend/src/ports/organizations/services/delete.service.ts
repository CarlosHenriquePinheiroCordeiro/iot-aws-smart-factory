import { Injectable } from '@nestjs/common/decorators/core';
import { DeleteUseCase } from '../use-cases';
import { DeletePort } from '../ports';
import { DeleteDto } from '../../../domain/organizations/dto/delete.dto';

@Injectable()
export class DeleteService implements DeleteUseCase {
  constructor(private deletePort: DeletePort) {}

  delete(deleteDto: DeleteDto): any {
    return this.deletePort.delete(deleteDto);
  }
}