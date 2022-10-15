import { sql } from 'kysely';
import { type ValidatorData } from 'remix-validated-form';
import { db } from '~/db/db.server';
import { escapeLike, kanaTranslate } from '~/utils/sql';
import { type radicalKanjiQueryParams } from '../validators/params';

type QueryParams = ValidatorData<typeof radicalKanjiQueryParams>;

export const getRadicalKanjisOrderByStrokeCount = (
  radicalId: number,
  { strokeCount, regular, read, direction }: QueryParams,
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
    .where('radical_code_point', '=', radicalId)
    .orderBy('in_radical_stroke_count', direction)
    .groupBy('in_radical_stroke_count')
    .execute();

export const getRadicalKanjisOrderByRead = (
  radicalId: number,
  { strokeCount, regular, read, direction }: QueryParams,
) =>
  db
    .selectFrom((db) =>
      db
        .selectFrom('kanji')
        .select([kanaTranslate.as('read_front'), 'read', 'code_point'])
        .innerJoin('kanji_read', 'code_point', 'kanji_read.kanji_code_point')
        .if(strokeCount != null, (qb) => qb.where('in_radical_stroke_count', '=', strokeCount!))
        .if(regular !== 'none', (qb) => qb.where('regular', '=', regular === 'true'))
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
