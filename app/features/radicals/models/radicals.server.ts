import { sql } from 'kysely';
import { type ValidatorData } from 'remix-validated-form';
import { db } from '~/db/db.server';
import { escapeLike } from '~/utils/sql';
import { radicalQueryParams } from '../validators/params';

type QueryParams = ValidatorData<typeof radicalQueryParams>;

export const radicalStrokeCountOrder = ({ direction, strokeCount, read }: QueryParams) =>
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

export const radicalReadOrder = ({ direction, strokeCount, read }: QueryParams) =>
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
