import { Module } from '@nestjs/common/decorators/modules';
import { ConfigModule } from '@nestjs/config';
import { AwsCognitoModule } from './auth/aws-cognito/aws-cognito.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostgreSqlDataSource from './config/pgsql/ormconfig';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(PostgreSqlDataSource.options),
    AuthModule,
    AwsCognitoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
