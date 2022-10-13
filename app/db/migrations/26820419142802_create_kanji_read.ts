import { Kysely, sql } from 'kysely';
import { type Database } from '../types';

export const up = ({ schema }: Kysely<Database>) =>
  schema
    .createTable('kanji_read')
    .addColumn('read', sql`varchar collate "ja-x-icu"`, (col) => col.notNull())
    .addColumn('kanji_code_point', 'integer', (col) => col.references('kanji.code_point').onDelete('cascade').notNull())
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addPrimaryKeyConstraint('kanji_read_primary_key', ['kanji_code_point', 'read'])
    .execute();

export const down = ({ schema }: Kysely<Database>) => schema.dropTable('kanji_read').execute();
