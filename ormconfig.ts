import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import TypeOrmNamingStrategy from './apps/api/src/app/libs/TypeOrmNamingStrategy';

const dbLocalConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.NODE_ENV === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test',
  dropSchema: process.env.NODE_ENV === 'test',
  logging: process.env.NODE_ENV === 'development',
  entities: ['apps/api/src/app/entities/*.ts'],
  migrations: ['db/migrations/*.ts'],
  cli: {
    migrationsDir: 'db/migrations',
  },
  namingStrategy: new TypeOrmNamingStrategy(),
};

module.exports = dbLocalConfig;
