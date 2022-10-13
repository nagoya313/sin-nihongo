import { Kysely, sql } from 'kysely';
import { type Database } from '../types';

export const up = ({ schema }: Kysely<Database>) =>
  schema
    .createTable('radical_read')
    .addColumn('read', sql`varchar collate "ja-x-icu"`, (col) => col.notNull())
    .addColumn('radical_code_point', 'int2', (col) =>
      col.references('radical.code_point').onDelete('cascade').notNull()
    )
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addPrimaryKeyConstraint('radical_read_primary_key', ['radical_code_point', 'read'])
    .execute();

export const down = ({ schema }: Kysely<Database>) => schema.dropTable('radical_read').execute();
