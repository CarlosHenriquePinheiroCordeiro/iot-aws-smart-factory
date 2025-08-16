import { Controller } from '@nestjs/common/decorators/core';
import { Response } from 'express';
import { Body, Post, Res, Get, HttpCode } from '@nestjs/common/decorators/http';
import { IHttpResponse } from '../../../../interfaces/http-response.interface';
import { DtoToDomainPipe } from '../../../../pipes/dtoToDomain.pipe';
import { HttpStatus } from '@nestjs/common';
import { File } from '../../../../domain/file-storage/File';
import { GeneratePresignedPutUrlPort, GetPublicUrlPort } from '../../../../ports/file-storage/ports';
import { PutFileDto } from '../../../../domain/file-storage/dto/put-file.dto';

@Controller('files')
export class FileStorageController {
  constructor(
    private readonly getPublicUrlPort: GetPublicUrlPort,
    private readonly generatePresignedPutUrlPort: GeneratePresignedPutUrlPort,
  ) {}

  /*@Get('/:Bucket/:Key')
  @HttpCode(HttpStatus.OK)
  async getObject( @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.getPublicUrlPort.getPublicUrlPort()) as Partial<IHttpResponse>;
    return response.json(resp);
  }*/

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new DtoToDomainPipe(PutFileDto, File)) file: File, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.generatePresignedPutUrlPort.generatePresignedPutUrl(
        file.getBucket()!,
        file.getKey()!,
        file.getContentType()!,
    )) as Partial<IHttpResponse>;
    return response.json(resp);
  }



}