import { IDomain } from "./domain.interface";
import { IEntity } from "./entity.interface";

export interface IMapper {

    toDomain(entity: IEntity): IDomain;

    toEntity(domain: IDomain): IEntity;


}