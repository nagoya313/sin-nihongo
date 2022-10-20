import { sql } from 'kysely';
import { type ValidatorData } from 'remix-validated-form';
import { db } from '~/db/db.server';
import { escapeLike, kanaTranslate } from '~/utils/sql';
import { readKanjiQueryParams } from './validators';

type QueryParams = ValidatorData<typeof readKanjiQueryParams>;

export const getKanjisOrderByRead = ({ strokeCount, regular, forName, jisLevel, read, direction }: QueryParams) =>
  db
    .selectFrom((db) =>
      db
        .selectFrom('kanji')
        .select([kanaTranslate.as('read_front'), 'read', 'code_point'])
        .innerJoin('kanji_read', 'code_point', 'kanji_read.kanji_code_point')
        .if(strokeCount != null, (qb) => qb.where('stroke_count', '=', strokeCount!))
        .if(regular !== 'none', (qb) => qb.where('regular', '=', regular === 'true'))
        .if(forName !== 'none', (qb) => qb.where('for_name', '=', forName === 'true'))
        .if(jisLevel != null, (qb) => qb.where('jis_level', '=', jisLevel!))
        .if(!!read, (qb) => qb.where('read', 'like', `${escapeLike(read!)}%`))
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
