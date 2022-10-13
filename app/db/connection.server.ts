import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { type Database } from './types';

export const connectDatabase = () => {
  console.log('db connection');
  console.log(process.env['DATABASE_URL']);

  const db = new Kysely<Database>({
    dialect: new PostgresDialect({ pool: new Pool({ connectionString: process.env['DATABASE_URL'] }) }),
    log(event) {
      switch (event.level) {
        case 'query': {
          console.log(event.query.sql);
          console.log(event.query.parameters);
          break;
        }
        case 'error': {
          console.error(event.error);
        }
      }
    },
  });

  return db;
};
