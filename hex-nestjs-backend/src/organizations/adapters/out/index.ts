import { Provider } from '@nestjs/common/interfaces/modules';
import { FindPort } from '../../application/ports/out/find.port';
import { FindAdapter } from './find.adapter';
import { FindByIdPort } from '../../application/ports/out/findById.port';
import { FindByIdAdapter } from './findById.adapter';
import { CreatePort } from '../../application/ports/out/create.port';
import { CreateAdapter } from './create.adapter';
import { UpdatePort } from '../../application/ports/out/update.port';
import { UpdateAdapter } from './update.adapter';
import { DeletePort } from '../../application/ports/out/delete.port';
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