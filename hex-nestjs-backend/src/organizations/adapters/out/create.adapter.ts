import { Injectable } from '@nestjs/common/decorators/core';
import { CreateDto } from '../../dto/create.dto';
import { CreatePort } from '../../application/ports/out/create.port';

@Injectable()
export class CreateAdapter extends CreatePort {

  async create(createDto: CreateDto): Promise<any> {/* LOGIC */}


}