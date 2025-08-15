import { Type } from "@nestjs/common";
import { plainToInstance } from 'class-transformer';
import { IDto } from "../../interfaces/dto.interface";
import { IDomain } from "../../interfaces/domain.interface";
import { IEntity } from "../../interfaces/entity.interface";

export class Mapper {

    private static clean<T extends Record<string, any>>(obj: T): Partial<T> {
        return Object.fromEntries(
            Object.entries(obj).filter(([, v]) =>
                v !== undefined &&
                v !== null
            )
        ) as Partial<T>;
    }

    static objectToDto = (instanceClass: Type<IDto>, object: Object): IDto => {
        return plainToInstance(instanceClass, object, { enableImplicitConversion: true });
    }

    static dtoToDomain = (instanceClass: Type<IDomain>, dto: IDto): IDomain => {
        const plain = Mapper.clean(dto as any);
        return plainToInstance(instanceClass, plain, { enableImplicitConversion: true });
    }

    static entityToDomain = (instanceClass: Type<IDomain>, entity: IEntity): IDomain => {
        const plain = Mapper.clean(entity as any);
        return plainToInstance(instanceClass, plain, { enableImplicitConversion: true });
    }

    static domainToEntity = (instanceClass: Type<IEntity>, domain: IDomain): IEntity => {
        const plain = Mapper.clean(domain as any);
        return plainToInstance(instanceClass, plain, { enableImplicitConversion: true });
    }
}
