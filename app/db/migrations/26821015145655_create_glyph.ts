import { type Kysely, sql } from 'kysely';
import { type Database } from '../types';

export const up = ({ schema }: Kysely<Database>) =>
  schema
    .createTable('glyph')
    .addColumn('name', 'varchar', (col) => col.primaryKey())
    .addColumn('data', 'varchar', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

export const down = ({ schema }: Kysely<Database>) => schema.dropTable('glyph').execute();
