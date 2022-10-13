import { Kysely, sql } from 'kysely';
import { type Database } from '../types';

export const up = ({ schema }: Kysely<Database>) =>
  schema
    .createTable('kanji')
    .addColumn('code_point', 'integer', (col) => col.primaryKey())
    .addColumn('regular', 'boolean', (col) => col.notNull().defaultTo(false))
    .addColumn('for_name', 'boolean', (col) => col.notNull().defaultTo(false))
    .addColumn('stroke_count', 'int2', (col) => col.notNull())
    .addColumn('in_radical_stroke_count', 'int2', (col) => col.notNull())
    .addColumn('radical_code_point', 'int2', (col) =>
      col.references('radical.code_point').onDelete('cascade').notNull()
    )
    .addColumn('jis_level', 'int2', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

export const down = async ({ schema }: Kysely<Database>) => schema.dropTable('kanji').execute();
