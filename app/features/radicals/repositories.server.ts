import { sql } from 'kysely';
import { type ValidatorData } from 'remix-validated-form';
import { db } from '~/db/db.server';
import { escapeLike, kanaTranslate } from '~/utils/sql';
import { type inRadicalKanjiQueryParams, type radicalQueryParams } from './validators';

type RadicalQueryParams = ValidatorData<typeof radicalQueryParams>;
type InRadicalKanjiQueryParams = ValidatorData<typeof inRadicalKanjiQueryParams>;

export const getRadicalsOrderByCodePoint = ({ read }: RadicalQueryParams) =>
  db
    .selectFrom('radical')
    .select([
      'code_point',
      sql<string>`chr(radical.code_point)`.as('radical'),
      sql<ReadonlyArray<string>>`array_agg(distinct read order by read)`.as('reads'),
    ])
    .if(!!read, (qb) =>
      qb
        .innerJoin('radical_read', 'radical.code_point', 'radical_read.radical_code_point')
        .where('read', 'like', `${escapeLike(read!)}%`),
    )
    .orderBy('code_point')
    .groupBy('code_point')
    .distinct()
    .execute();

export const getRadicalsOrderByStrokeCount = ({ direction, strokeCount, read }: RadicalQueryParams) =>
  db
    .selectFrom('radical')
    .select([
      'stroke_count',
      sql<ReadonlyArray<number>>`array_agg(distinct code_point order by code_point)`.as('code_points'),
    ])
    .if(!!read, (qb) =>
      qb
        .innerJoin('radical_read', 'radical.code_point', 'radical_read.radical_code_point')
        .where('read', 'like', `${escapeLike(read!)}%`),
    )
    .if(strokeCount != null, (qb) => qb.where('stroke_count', '=', strokeCount!))
    .orderBy('stroke_count', direction)
    .groupBy('stroke_count')
    .execute();

export const getRadicalsOrderByRead = ({ direction, strokeCount, read }: RadicalQueryParams) =>
  db
    .selectFrom((db) =>
      db
        .selectFrom('radical')
        .select([sql<string>`left(read, 1)`.as('read_front'), 'read', 'code_point'])
        .innerJoin('radical_read', 'radical.code_point', 'radical_read.radical_code_point')
        .if(strokeCount != null, (qb) => qb.where('stroke_count', '=', strokeCount!))
        .if(!!read, (qb) => qb.where('read', 'like', `${escapeLike(read!)}%`))
        .as('radicals'),
    )
    .select([
      'read_front',
      sql<
        ReadonlyArray<{ code_point: number; read: string }>
      >`array_agg(json_build_object('code_point', code_point, 'read', read) order by read ${sql.raw(
        direction,
      )}, code_point)`.as('results'),
    ])
    .orderBy('read_front', direction)
    .groupBy('read_front')
    .execute();

export const getInRadicalKanjisOrderByStrokeCount = (
  radicalId: number,
  { strokeCount, regular, forName, jisLevel, read, direction }: InRadicalKanjiQueryParams,
) =>
  db
    .selectFrom('kanji')
    .select([
      'in_radical_stroke_count',
      sql<ReadonlyArray<number>>`array_agg(distinct code_point order by code_point)`.as('code_points'),
    ])
    .if(!!read, (qb) =>
      qb
        .innerJoin('kanji_read', 'code_point', 'kanji_read.kanji_code_point')
        .where('read', 'like', `${escapeLike(read!)}%`),
    )
    .if(strokeCount != null, (qb) => qb.where('in_radical_stroke_count', '=', strokeCount!))
    .if(regular !== 'none', (qb) => qb.where('regular', '=', regular === 'true'))
    .if(forName !== 'none', (qb) => qb.where('for_name', '=', forName === 'true'))
    .if(jisLevel != null, (qb) => qb.where('jis_level', '=', jisLevel!))
    .where('radical_code_point', '=', radicalId)
    .orderBy('in_radical_stroke_count', direction)
    .groupBy('in_radical_stroke_count')
    .execute();

export const getInRadicalKanjisOrderByRead = (
  radicalId: number,
  { strokeCount, regular, forName, jisLevel, read, direction }: InRadicalKanjiQueryParams,
) =>
  db
    .selectFrom((db) =>
      db
        .selectFrom('kanji')
        .select([kanaTranslate.as('read_front'), 'read', 'code_point'])
        .innerJoin('kanji_read', 'code_point', 'kanji_read.kanji_code_point')
        .if(strokeCount != null, (qb) => qb.where('in_radical_stroke_count', '=', strokeCount!))
        .if(regular !== 'none', (qb) => qb.where('regular', '=', regular === 'true'))
        .if(forName !== 'none', (qb) => qb.where('for_name', '=', forName === 'true'))
        .if(jisLevel != null, (qb) => qb.where('jis_level', '=', jisLevel!))
        .if(!!read, (qb) => qb.where('read', 'like', `${escapeLike(read!)}%`))
        .where('radical_code_point', '=', radicalId)
        .as('kanjis'),
    )
    .select([
      'read_front',
      sql<
        ReadonlyArray<{ code_point: number; read: string }>
      >`array_agg(json_build_object('code_point', code_point, 'read', read) order by read ${sql.raw(
        direction,
      )}, code_point)`.as('results'),
    ])
    .orderBy('read_front', direction)
    .groupBy('read_front')
    .execute();

export const getRadicalByCodePoint = (codePoint: number) =>
  db
    .selectFrom('radical')
    .innerJoin('kanji', 'radical.code_point', 'kanji.radical_code_point')
    .innerJoin('radical_read', 'radical.code_point', 'radical_read.radical_code_point')
    .select([
      'radical.stroke_count',
      'radical.code_point',
      sql<number>`cast(count(kanji.code_point) as int2)`.as('kanji_count'),
      sql<ReadonlyArray<string>>`array_agg(distinct read order by read)`.as('reads'),
      sql<string>`chr(radical.code_point)`.as('radical'),
    ])
    .where('radical.code_point', '=', codePoint)
    .groupBy('radical.code_point')
    .executeTakeFirst();
