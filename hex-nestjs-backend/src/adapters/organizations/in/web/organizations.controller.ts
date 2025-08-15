import { Controller } from '@nestjs/common/decorators/core';
import { Response } from 'express';
import { Body, Delete, Patch, Post, Res, Get, HttpCode } from '@nestjs/common/decorators/http';
import { IHttpResponse } from '../../../../interfaces/http-response.interface';
import { CreateDto } from '../../../../domain/organizations/dto/create.dto';
import { UpdateDto } from '../../../../domain/organizations/dto/update.dto';
import { DeleteDto } from '../../../../domain/organizations/dto/delete.dto';
import { Organization } from '../../../../domain/organizations/Organization';
import { DtoToDomainPipe } from '../../../../pipes/dtoToDomain.pipe';
import { FindUseCase } from '../../../../ports/organizations/use-cases';
import { FindByIdUseCase } from '../../../../ports/organizations/use-cases';
import { CreateUseCase } from '../../../../ports/organizations/use-cases';
import { UpdateUseCase } from '../../../../ports/organizations/use-cases';
import { DeleteUseCase } from '../../../../ports/organizations/use-cases';
import { HttpStatus } from '@nestjs/common';

@Controller('organizations')
export class OrganizationsController {
  constructor(
    private readonly findUseCase: FindUseCase,
    private readonly findByIdUseCase: FindByIdUseCase,
    private readonly createUseCase: CreateUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly deleteUseCase: DeleteUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async find(@Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.findUseCase.find()) as Partial<IHttpResponse>;
    return response.json(resp);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findById( @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.findByIdUseCase.findById()) as Partial<IHttpResponse>;
    return response.json(resp);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new DtoToDomainPipe(CreateDto, Organization)) organization: Organization, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.createUseCase.create(
      organization,
    )) as Partial<IHttpResponse>;
    return response.json(resp);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async update(@Body() updateDto: UpdateDto, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.updateUseCase.update(
      updateDto,
    )) as Partial<IHttpResponse>;
    return response.json(resp);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async delete(@Body() deleteDto: DeleteDto, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.deleteUseCase.delete(
      deleteDto,
    )) as Partial<IHttpResponse>;
    return response.json(resp);
  }



}