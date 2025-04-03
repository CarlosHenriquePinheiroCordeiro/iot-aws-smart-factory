import { Injectable } from '@nestjs/common/decorators/core';
import { FindPort } from '../../application/ports/out/find.port';

@Injectable()
export class FindAdapter extends FindPort {

  async find(): Promise<any> {/* LOGIC */}


}