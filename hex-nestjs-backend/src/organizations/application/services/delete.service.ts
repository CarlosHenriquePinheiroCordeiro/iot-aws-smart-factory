import { Injectable } from '@nestjs/common/decorators/core';
import { DeleteUseCase } from '../ports/in/delete.use-case';
import { DeletePort } from '../ports/out/delete.port';
import { DeleteDto } from '../../dto/delete.dto';

@Injectable()
export class DeleteService implements DeleteUseCase {
  constructor(private deletePort: DeletePort) {}

  delete(deleteDto: DeleteDto): any {
    return this.deletePort.delete(deleteDto);
  }
}