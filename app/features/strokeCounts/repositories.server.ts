import { sql } from 'kysely';
import { type ValidatorData } from 'remix-validated-form';
import { db } from '~/db/db.server';
import { escapeLike } from '~/utils/sql';
import { strokeCountKanjiQueryParams } from './validators';

type QueryParams = ValidatorData<typeof strokeCountKanjiQueryParams>;

export const getKanjisOrderByStrokeCount = ({ regular, read, direction }: QueryParams) =>
  db
    .selectFrom('kanji')
    .select([
      'stroke_count',
      sql<ReadonlyArray<number>>`array_agg(code_point order by radical_code_point, code_point)`.as('code_points'),
    ])
    .if(!!read, (qb) =>
      qb
        .innerJoin('kanji_read', 'kanji.code_point', 'kanji_read.kanji_code_point')
        .where('read', 'like', `${escapeLike(read!)}%`),
    )
    .if(regular !== 'none', (qb) => qb.where('regular', '=', regular === 'true'))
    .groupBy('stroke_count')
    .orderBy('stroke_count', direction)
    .execute();
