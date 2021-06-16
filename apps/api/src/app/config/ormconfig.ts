import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
import TypeOrmNamingStrategy from './TypeOrmNamingStrategy';

const pgConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      url: process.env.DATABASE_URL,
      ssl: true,
      extra: {
        ssl: { rejectUnauthorized: false },
      },
    };
  } else {
    return {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
    };
  }
};

export default [
  // PostgreSQL設定
  {
    name: 'pg',
    type: 'postgres',
    ...pgConfig(),
    synchronize: process.env.NODE_ENV === 'development',
    migrationsRun: process.env.NODE_ENV !== 'development',
    logging: process.env.NODE_ENV === 'development',
    dropSchema: process.env.NODE_ENV === 'test',
    entities: ['apps/api/src/app/entities/pg/*.ts'],
    cli: {
      migrationsDir: 'db/migrations',
    },
    seeds: ['apps/api/src/app/seeds/*.ts'],
    namingStrategy: new TypeOrmNamingStrategy(),
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
    synchronize: process.env.NODE_ENV === 'development',
    migrationsRun: process.env.NODE_ENV !== 'development',
    logging: process.env.NODE_ENV === 'development',
    dropSchema: process.env.NODE_ENV === 'test',
    entities: ['apps/api/src/app/entities/mongo/*.ts'],
    namingStrategy: new TypeOrmNamingStrategy(),
  },
] as ConnectionOptions[];
