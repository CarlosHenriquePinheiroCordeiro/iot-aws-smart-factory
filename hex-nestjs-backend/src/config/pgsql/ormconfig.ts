import { DataSource } from 'typeorm';

export const PostgreSqlDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGSQL_HOST || 'dev-pgsql',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'iot-smart-factory',
  entities: ['dist/db/entities/*.entity.js'], 
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
  logging: true,
});

export default PostgreSqlDataSource;
