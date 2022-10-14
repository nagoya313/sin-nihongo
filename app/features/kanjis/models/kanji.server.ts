import { sql } from 'kysely';
import { db } from '~/db/db.server';

export const kanji = (codePoint: number) =>
  db
    .selectFrom('kanji')
    .innerJoin('kanji_read', 'kanji.code_point', 'kanji_read.kanji_code_point')
    .select([
      'kanji.stroke_count',
      'kanji.code_point',
      'kanji.radical_code_point',
      sql<ReadonlyArray<string>>`array_agg(distinct read order by read)`.as('reads'),
      sql<string>`chr(kanji.code_point)`.as('kanji'),
      sql<string>`chr(kanji.radical_code_point)`.as('radical'),
    ])
    .where('kanji.code_point', '=', codePoint)
    .groupBy('kanji.code_point')
    .executeTakeFirst();
