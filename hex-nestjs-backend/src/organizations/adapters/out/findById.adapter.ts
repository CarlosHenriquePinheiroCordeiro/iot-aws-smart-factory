import { Injectable } from '@nestjs/common/decorators/core';
import { FindByIdPort } from '../../application/ports/out/findById.port';

@Injectable()
export class FindByIdAdapter extends FindByIdPort {

  async findById(): Promise<any> {/* LOGIC */}


}