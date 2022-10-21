import { sql } from 'kysely';
import { type ValidatorData } from 'remix-validated-form';
import { db } from '~/db/db.server';
import { escapeLike } from '~/utils/sql';
import { type radicalQueryParams, type radicalUpdateParams } from './validators';

type RadicalQueryParams = ValidatorData<typeof radicalQueryParams>;

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

export const getRadicalsOrderByStrokeCount = ({ direction, stroke_count, read }: RadicalQueryParams) =>
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
    .if(stroke_count != null, (qb) => qb.where('stroke_count', '=', stroke_count!))
    .orderBy('stroke_count', direction)
    .groupBy('stroke_count')
    .execute();

export const getRadicalsOrderByRead = ({ direction, stroke_count, read }: RadicalQueryParams) =>
  db
    .selectFrom((db) =>
      db
        .selectFrom('radical')
        .select([sql<string>`left(read, 1)`.as('read_front'), 'read', 'code_point'])
        .innerJoin('radical_read', 'radical.code_point', 'radical_read.radical_code_point')
        .if(stroke_count != null, (qb) => qb.where('stroke_count', '=', stroke_count!))
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

export const updateRadical = (codePoint: number, { stroke_count, reads }: ValidatorData<typeof radicalUpdateParams>) =>
  db.transaction().execute(async (trx) => {
    await trx
      .updateTable('radical')
      .set({ stroke_count: stroke_count, updated_at: new Date() })
      .where('code_point', '=', codePoint)
      .executeTakeFirstOrThrow();
    await trx
      .deleteFrom('radical_read')
      .where('radical_code_point', '=', codePoint)
      .where('read', 'not in', reads)
      .executeTakeFirstOrThrow();
    await trx
      .insertInto('radical_read')
      .values(reads.map((read) => ({ read, radical_code_point: codePoint })))
      .onConflict((oc) =>
        oc.columns(['read', 'radical_code_point']).doUpdateSet({
          updated_at: new Date(),
        }),
      )
      .executeTakeFirstOrThrow();
  });
