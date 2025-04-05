import { Type } from "@nestjs/common";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../Organization';
import { OrganizationEntity } from '../../db/entities/organization.entity';
import { IRepository } from '../../interfaces/repository.interface';
import { Mapper } from '../../db/mappers/mapper';

@Injectable()
export class OrganizationRepository implements IRepository {

    constructor(
        @InjectRepository(OrganizationEntity)
        private readonly organizationRepository: Repository<OrganizationEntity>,
    ) {}

    async findById(id: string): Promise<Organization | null> {
        const organizationEntity = await this.organizationRepository.findOneBy({ id });
        if (!organizationEntity) return null;
        return Mapper.entityToDomain(Organization, organizationEntity) as Organization;
    }

    async save(organization: Organization): Promise<any> {
        const organizationEntity = Mapper.domainToEntity(OrganizationEntity, organization);
        return await this.organizationRepository.save(organizationEntity);
    }

    
}