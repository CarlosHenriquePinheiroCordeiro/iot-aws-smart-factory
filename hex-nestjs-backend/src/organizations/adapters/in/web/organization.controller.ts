import { Controller } from '@nestjs/common/decorators/core';
import { Body, Delete, Patch, Post, Res, Headers } from '@nestjs/common/decorators/http';
import { HttpResponse } from 'aws-sdk';
import { IHttpResponse } from '../../../../interfaces/http-response.interface';
import { Response } from 'express';

@Controller('organization')
export class OrganizationController {
    /*constructor(
        private readonly createUseCase: CreateUseCase,
    ) {}

    @Post()
    async login(@Body() loginDto: CreateDto, @Res() response: Response) {
        const resp: Partial<IHttpResponse> = (await this.createUseCase.login(
            loginDto,
        )) as Partial<HttpResponse>;
        return response.status(resp.statusCode!).json(resp);
    }

    @Patch()
    async update(@Body() confirmDto: ConfirmDto, @Res() response: Response) {
        const resp: Partial<IHttpResponse> = (await this.confirmUseCase.confirm(
            confirmDto,
        )) as Partial<IHttpResponse>;
        return response.status(resp.statusCode!).json(resp);
    }

    @Delete()
    async delete(@Headers() header: any, @Res() response: Response) {
        const token: string = header.authorization.split(' ')[1] as string;
        const resp: Partial<IHttpResponse> = (await this.logoutUseCase.logout(
            token,
        )) as Partial<IHttpResponse>;
        return response.status(resp.statusCode!).json(resp);
    }*/
}
