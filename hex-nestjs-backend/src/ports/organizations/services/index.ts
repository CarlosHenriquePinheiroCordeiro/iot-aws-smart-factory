import { Provider } from '@nestjs/common';
import { FindUseCase } from '../use-cases';
import { FindService } from './find.service';
import { FindByIdUseCase } from '../use-cases';
import { FindByIdService } from './findById.service';
import { CreateUseCase } from '../use-cases';
import { CreateService } from './create.service';
import { UpdateUseCase } from '../use-cases';
import { UpdateService } from './update.service';
import { DeleteUseCase } from '../use-cases';
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