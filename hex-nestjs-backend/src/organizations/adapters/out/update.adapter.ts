import { Injectable } from '@nestjs/common/decorators/core';
import { UpdateDto } from '../../dto/update.dto';
import { UpdatePort } from '../../application/ports/out/update.port';

@Injectable()
export class UpdateAdapter extends UpdatePort {

  async update(updateDto: UpdateDto): Promise<any> {/* LOGIC */}


}