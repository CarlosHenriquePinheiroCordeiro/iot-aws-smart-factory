import { DataSource } from 'typeorm';

export const DatabaseSource = new DataSource({
  type: 'postgres',
  host: process.env.PGSQL_HOST || 'dev-pgsql',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  synchronize: true,
  logging: ['schema', 'error', 'warn'],
});

export default DatabaseSource;
