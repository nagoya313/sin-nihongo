import { sql } from 'kysely';
import { type ValidatorData } from 'remix-validated-form';
import { db } from '~/db/db.server';
import { escapeLike } from '~/utils/sql';
import { strokeCountKanjiQueryParams } from './validators';

type QueryParams = ValidatorData<typeof strokeCountKanjiQueryParams>;

export const getKanjisOrderByStrokeCount = ({ regular, forName, jisLevel, read, direction }: QueryParams) =>
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
    .if(forName !== 'none', (qb) => qb.where('for_name', '=', forName === 'true'))
    .if(jisLevel != null, (qb) => qb.where('jis_level', '=', jisLevel!))
    .groupBy('stroke_count')
    .orderBy('stroke_count', direction)
    .execute();
