import { Injectable } from '@nestjs/common/decorators/core';
import { DeleteDto } from '../../dto/delete.dto';
import { DeletePort } from '../../application/ports/out/delete.port';

@Injectable()
export class DeleteAdapter extends DeletePort {

  async delete(deleteDto: DeleteDto): Promise<any> {/* LOGIC */}


}