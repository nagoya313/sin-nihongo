import { Kysely, sql } from 'kysely';
import { type Database } from '../types';

export const up = ({ schema }: Kysely<Database>) =>
  schema
    .createTable('radical')
    .addColumn('code_point', 'int2', (col) => col.primaryKey())
    .addColumn('stroke_count', 'int2', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

export const down = ({ schema }: Kysely<Database>) => schema.dropTable('radical').execute();
