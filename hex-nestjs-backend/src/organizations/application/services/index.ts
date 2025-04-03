import { Provider } from '@nestjs/common';
import { FindUseCase } from '../ports/in/find.use-case';
import { FindService } from './find.service';
import { FindByIdUseCase } from '../ports/in/findById.use-case';
import { FindByIdService } from './findById.service';
import { CreateUseCase } from '../ports/in/create.use-case';
import { CreateService } from './create.service';
import { UpdateUseCase } from '../ports/in/update.use-case';
import { UpdateService } from './update.service';
import { DeleteUseCase } from '../ports/in/delete.use-case';
import { DeleteService } from './delete.service';

export const Services: Provider[] = [
 {
    provide: FindUseCase,
    useClass: FindService,
  },
 {
    provide: FindByIdUseCase,
    useClass: FindByIdService,
  },
 {
    provide: CreateUseCase,
    useClass: CreateService,
  },
 {
    provide: UpdateUseCase,
    useClass: UpdateService,
  },
 {
    provide: DeleteUseCase,
    useClass: DeleteService,
  },
]