import { Module } from '@nestjs/common/decorators/modules';
import { ConfigModule } from '@nestjs/config';
import { AwsCognitoModule } from './cloud/aws/cognito/aws-cognito.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseSource from './config/pgsql/ormconfig';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './feature/organizations/organizations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({...DatabaseSource.options, autoLoadEntities: true}),
    AuthModule,
    AwsCognitoModule,
    OrganizationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
