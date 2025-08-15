import { Injectable } from '@nestjs/common/decorators/core';
import { DeleteDto } from '../../../domain/organizations/dto/delete.dto';
import { DeletePort } from '../../../ports/organizations/ports';

@Injectable()
export class DeleteAdapter extends DeletePort {

  async delete(deleteDto: DeleteDto): Promise<any> {/* LOGIC */}


}