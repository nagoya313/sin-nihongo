import 'reflect-metadata';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Radical } from '../entities/Radical';

export const dbConfig = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const options: PostgresConnectionOptions = require('../../../../../ormconfig');
  return Object.assign(options, {
    entities: [Radical],
    migrations: [],
  });
};
