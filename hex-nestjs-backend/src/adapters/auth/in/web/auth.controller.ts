import { Controller } from '@nestjs/common/decorators/core';
import { Body, Delete, Patch, Post, Res, Headers } from '@nestjs/common/decorators/http';
import { HttpResponse } from 'aws-sdk';
import { Response } from 'express';
import { LoginUseCase } from '../../../../ports/auth/use-cases';
import { ConfirmUseCase } from '../../../../ports/auth/use-cases';
import { RegisterUseCase } from '../../../../ports/auth/use-cases';
import { LogoutUseCase } from '../../../../ports/auth/use-cases';
import { LoginDto } from '../../../../domain/auth/dto/login.dto';
import { IHttpResponse } from '../../../../interfaces/http-response.interface';
import { ConfirmDto } from '../../../../domain/auth/dto/confirm.dto';
import { RegisterDto } from '../../../../domain/auth/dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly confirmUseCase: ConfirmUseCase,
        private readonly registerUseCase: RegisterUseCase,
        private readonly logoutUseCase: LogoutUseCase,
    ) {}

    @Post('/login')
    async login(@Body() loginDto: LoginDto, @Res() response: Response) {
        const resp: Partial<IHttpResponse> = (await this.loginUseCase.login(
            loginDto,
        )) as Partial<HttpResponse>;
        return response.status(resp.statusCode!).json(resp);
    }

    @Patch('/confirm')
    async confirm(@Body() confirmDto: ConfirmDto, @Res() response: Response) {
        const resp: Partial<IHttpResponse> = (await this.confirmUseCase.confirm(
            confirmDto,
        )) as Partial<IHttpResponse>;
        return response.status(resp.statusCode!).json(resp);
    }

    @Post('/register')
      async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
        const resp: Partial<IHttpResponse> = (await this.registerUseCase.register(
          registerDto,
        )) as Partial<IHttpResponse>;
        return response.status(resp.statusCode!).json(resp);
      }

    @Delete('/logout')
    async logout(@Headers() header: any, @Res() response: Response) {
        const token: string = header.authorization.split(' ')[1] as string;
        const resp: Partial<IHttpResponse> = (await this.logoutUseCase.logout(
            token,
        )) as Partial<IHttpResponse>;
        return response.status(resp.statusCode!).json(resp);
    }
}
