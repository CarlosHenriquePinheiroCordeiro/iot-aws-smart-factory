import { Injectable } from '@nestjs/common/decorators/core';
import { FindByIdPort } from '../../../ports/organizations/ports';

@Injectable()
export class FindByIdAdapter extends FindByIdPort {

  async findById(): Promise<any> {/* LOGIC */}


}