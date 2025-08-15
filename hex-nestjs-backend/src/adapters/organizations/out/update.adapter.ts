import { Injectable } from '@nestjs/common/decorators/core';
import { UpdateDto } from '../../../domain/organizations/dto/update.dto';
import { UpdatePort } from '../../../ports/organizations/ports';

@Injectable()
export class UpdateAdapter extends UpdatePort {

  async update(updateDto: UpdateDto): Promise<any> {/* LOGIC */}


}