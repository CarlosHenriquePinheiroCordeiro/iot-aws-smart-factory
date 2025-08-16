import { Controller } from '@nestjs/common/decorators/core';
import { Response } from 'express';
import { Body, Delete, Patch, Post, Res, Get, HttpCode, Param } from '@nestjs/common/decorators/http';
import { IHttpResponse } from '../../../../interfaces/http-response.interface';
import { CreateDto } from '../../../../domain/organizations/dto/create.dto';
import { UpdateDto } from '../../../../domain/organizations/dto/update.dto';
import { DeleteDto } from '../../../../domain/organizations/dto/delete.dto';
import { Organization } from '../../../../domain/organizations/Organization';
import { DtoToDomainPipe } from '../../../../pipes/dtoToDomain.pipe';
import { HttpStatus } from '@nestjs/common';
import { CreateOrganizationPort, DeleteOrganizationPort, FindOrganizationByIdPort, FindOrganizationsPort, UpdateOrganizationPort } from '../../../../domain/organizations/ports/inbound';

@Controller('organizations')
export class OrganizationsController {
  constructor(
    private readonly findPort: FindOrganizationsPort,
    private readonly findByIdPort: FindOrganizationByIdPort,
    private readonly createPort: CreateOrganizationPort,
    private readonly updatePort: UpdateOrganizationPort,
    private readonly deletePort: DeleteOrganizationPort,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async find(@Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.findPort.find()) as Partial<IHttpResponse>;
    return response.json(resp);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findById( @Param('id') id: string, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.findByIdPort.findById(id)) as Partial<IHttpResponse>;
    return response.json(resp);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new DtoToDomainPipe(CreateDto, Organization)) organization: Organization, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.createPort.create(
      organization,
    )) as Partial<IHttpResponse>;
    return response.json(resp);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async update(@Body(new DtoToDomainPipe(UpdateDto, Organization)) organization: Partial<Organization> & { id: string }, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.updatePort.update(
      organization,
    )) as Partial<IHttpResponse>;
    return response.json(resp);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async delete(@Body(new DtoToDomainPipe(DeleteDto, Organization)) organization: Partial<Organization> & { id: string }, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.deletePort.delete(
      organization,
    )) as Partial<IHttpResponse>;
    return response.json(resp);
  }



}