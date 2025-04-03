import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
    Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
  
@Injectable()
export class DtoToDomain<IDto, IDomain> implements PipeTransform<any> {
    constructor(
        private readonly dtoClass: Type<IDto>,
        private readonly domainClass: Type<IDomain>,
    ) {}

    async transform(value: any, metadata: ArgumentMetadata): Promise<IDomain> {
        const dtoObject = plainToInstance(this.dtoClass, value);
        console.log(dtoObject)
        const errors = await validate(dtoObject as Object);
        if (errors.length > 0) {
            throw new BadRequestException('Data not allowed');
        }

        const domainObject = plainToInstance(this.domainClass, dtoObject);

        return domainObject;
    }
}
