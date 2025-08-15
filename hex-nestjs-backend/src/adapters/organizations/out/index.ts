import { Provider } from '@nestjs/common/interfaces/modules';
import { FindPort } from '../../../ports/organizations/ports';
import { FindAdapter } from './find.adapter';
import { FindByIdPort } from '../../../ports/organizations/ports';
import { FindByIdAdapter } from './findById.adapter';
import { CreatePort } from '../../../ports/organizations/ports';
import { CreateAdapter } from './create.adapter';
import { UpdatePort } from '../../../ports/organizations/ports';
import { UpdateAdapter } from './update.adapter';
import { DeletePort } from '../../../ports/organizations/ports';
import { DeleteAdapter } from './delete.adapter';

export const ServicesOut: Provider[] = [
 {
    provide: FindPort,
    useClass: FindAdapter,
  },
 {
    provide: FindByIdPort,
    useClass: FindByIdAdapter,
  },
 {
    provide: CreatePort,
    useClass: CreateAdapter,
  },
 {
    provide: UpdatePort,
    useClass: UpdateAdapter,
  },
 {
    provide: DeletePort,
    useClass: DeleteAdapter,
  },
]