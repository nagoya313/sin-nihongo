import { type Kysely } from 'kysely';
import { type Database } from '../types';

export const up = ({ schema }: Kysely<Database>) =>
  schema
    .alterTable('kanji')
    .addColumn('glyph_name', 'varchar', (col) => col.references('glyph.name').onDelete('set null'))
    .execute();

export const down = ({ schema }: Kysely<Database>) => schema.alterTable('kanji').dropColumn('glyph_name').execute();
