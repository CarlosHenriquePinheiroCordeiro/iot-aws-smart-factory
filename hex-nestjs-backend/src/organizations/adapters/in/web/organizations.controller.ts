import { Controller } from '@nestjs/common/decorators/core';
import { Response } from 'express';
import { Body, Delete, Patch, Post, Res, Get } from '@nestjs/common/decorators/http';
import { IHttpResponse } from '../../../../interfaces/http-response.interface';
import { CreateDto } from '../../../dto/create.dto';
import { UpdateDto } from '../../../dto/update.dto';
import { DeleteDto } from '../../../dto/delete.dto';
import { FindUseCase } from '../../../application/ports/in/find.use-case';
import { FindByIdUseCase } from '../../../application/ports/in/findById.use-case';
import { CreateUseCase } from '../../../application/ports/in/create.use-case';
import { UpdateUseCase } from '../../../application/ports/in/update.use-case';
import { DeleteUseCase } from '../../../application/ports/in/delete.use-case';
import { DtoToDomain } from '../../../../pipes/dtoToDomain.pipe';
import { Organization } from '../../../Organization';

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
  async find(@Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.findUseCase.find()) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }

  @Get('/:id')
  async findById( @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.findByIdUseCase.findById()) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }

  @Post()
  async create(@Body(new DtoToDomain(CreateDto, Organization)) organization: Organization, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.createUseCase.create(
      organization,
    )) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }

  @Patch()
  async update(@Body() updateDto: UpdateDto, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.updateUseCase.update(
        updateDto,
    )) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }

  @Delete()
  async delete(@Body() deleteDto: DeleteDto, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.deleteUseCase.delete(
        deleteDto,
    )) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }



}