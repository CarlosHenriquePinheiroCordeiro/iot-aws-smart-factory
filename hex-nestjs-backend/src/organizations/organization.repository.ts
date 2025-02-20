import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './Organization';
import { OrganizationMapper } from '../db/mappers/organization.mapper';
import { OrganizationEntity } from '../db/entities/organization.entity';
import { IRepository } from '../interfaces/repository.interface';

@Injectable()
export class OrganizationRepository implements IRepository {

    mapper: OrganizationMapper = new OrganizationMapper();

    constructor(
        @InjectRepository(OrganizationEntity)
        private readonly organizationRepository: Repository<OrganizationEntity>,
    ) {}

    async findById(id: string): Promise<Organization | null> {
        const organizationEntity = await this.organizationRepository.findOneBy({ id });
        if (!organizationEntity) return null;
        return this.mapper.toDomain(organizationEntity);
    }

    async save(organization: Organization): Promise<void> {
        const organizationEntity = this.mapper.toEntity(organization);
        await this.organizationRepository.save(organizationEntity);
    }
}
