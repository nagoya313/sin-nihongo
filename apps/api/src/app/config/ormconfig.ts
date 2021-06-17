import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
import TypeOrmNamingStrategy from './TypeOrmNamingStrategy';

const pgConfig =
  process.env.NODE_ENV === 'production'
    ? {
        url: process.env.DATABASE_URL,
        ssl: true,
        extra: {
          ssl: { rejectUnauthorized: false },
        },
      }
    : {
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
      };

const commonConfig = {
  synchronize: process.env.NODE_ENV === 'development',
  migrationsRun: process.env.NODE_ENV !== 'development',
  logging: process.env.NODE_ENV === 'development',
  dropSchema: process.env.NODE_ENV === 'test',
  namingStrategy: new TypeOrmNamingStrategy(),
};

export default [
  // PostgreSQL設定
  {
    name: 'pg',
    type: 'postgres',
    ...pgConfig,
    ...commonConfig,
    entities: ['apps/api/src/app/entities/pg/*.ts'],
    cli: {
      migrationsDir: 'db/migrations',
    },
    seeds: ['apps/api/src/app/seeds/*.ts'],
  },
  // MongoDB設定
  // Herokuの無料枠の一万行では収まらないので
  // グリフデータはMongoDB Atlasに置く
  {
    name: 'mongo',
    type: 'mongodb',
    url: process.env.MONGO_URI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ...commonConfig,
    entities: ['apps/api/src/app/entities/mongo/*.ts'],
  },
] as ConnectionOptions[];
