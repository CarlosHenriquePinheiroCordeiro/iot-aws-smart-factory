import { Type } from "@nestjs/common";
import { IDto } from "../../interfaces/dto.interface";
import { IDomain } from "../../interfaces/domain.interface";
import { plainToInstance } from 'class-transformer';
import { IEntity } from "../../interfaces/entity.interface";

export class Mapper {

    static objectToDto = (instanceClass: Type<IDto>, object: Object): IDto => {
        return plainToInstance(instanceClass, object);
    }

    static dtoToDomain = (instanceClass: Type<IDomain>, dto: IDto): IDomain => {
        return plainToInstance(instanceClass, dto);
    }

    static entityToDomain = (instanceClass: Type<IDomain>, entity: IEntity): IDomain => {
        return plainToInstance(instanceClass, entity);
    }

    static domainToEntity = (instanceClass: Type<IEntity>, domain: IDomain): IEntity => {
        return plainToInstance(instanceClass, domain);
    }

  
}