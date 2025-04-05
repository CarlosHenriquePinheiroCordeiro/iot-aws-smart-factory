import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
    Type,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { Mapper } from '../db/mappers/mapper';
import { IDto } from '../interfaces/dto.interface';
import { IDomain } from '../interfaces/domain.interface';

@Injectable()
export class DtoToDomainPipe<TDto extends IDto, TDomain extends IDomain> implements PipeTransform<any> {
    constructor(
        private readonly dtoClass: Type<TDto>,
        private readonly domainClass: Type<TDomain>,
    ) {}

    async transform(value: any, metadata: ArgumentMetadata): Promise<IDomain> {
        const dtoObject = Mapper.objectToDto(this.dtoClass, value);
        const errors = await validate(dtoObject as Object);
        if (errors.length > 0) {
            throw new BadRequestException('Data not allowed');
        }

        const domainObject = Mapper.dtoToDomain(this.domainClass, dtoObject);

        return domainObject;
    }
}