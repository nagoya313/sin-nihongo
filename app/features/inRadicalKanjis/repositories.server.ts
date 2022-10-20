import { sql } from 'kysely';
import { type ValidatorData } from 'remix-validated-form';
import { db } from '~/db/db.server';
import { escapeLike, kanaTranslate } from '~/utils/sql';
import { type inRadicalKanjiQueryParams } from './validators';

// こゝは函數を分けないと型の處理が追ひつかなくてビルドができなくなる
type QueryParams = ValidatorData<typeof inRadicalKanjiQueryParams>;

export const getInRadicalKanjisOrderByStrokeCount = (
  radical: number,
  { read, inRadicalStrokeCount, regular, forName, jisLevel, direction }: QueryParams,
) =>
  db
    .selectFrom('kanji')
    .select([
      'in_radical_stroke_count',
      sql<ReadonlyArray<number>>`array_agg(code_point order by radical_code_point, code_point)`.as('code_points'),
    ])
    .if(!!read, (qb) =>
      qb
        .innerJoin('kanji_read', 'kanji.code_point', 'kanji_read.kanji_code_point')
        .where('read', 'like', `${escapeLike(read!)}%`),
    )
    .if(inRadicalStrokeCount != null, (qb) => qb.where('in_radical_stroke_count', '=', inRadicalStrokeCount!))
    .if(regular !== 'none', (qb) => qb.where('regular', '=', regular === 'true'))
    .if(forName !== 'none', (qb) => qb.where('for_name', '=', forName === 'true'))
    .if(jisLevel != null, (qb) => qb.where('jis_level', '=', jisLevel!))
    .if(radical != null, (qb) => qb.where('radical_code_point', '=', radical!))
    .groupBy('in_radical_stroke_count')
    .orderBy('in_radical_stroke_count', direction)
    .execute();

export const getInRadicalKanjisOrderByRead = (
  radical: number,
  { read, inRadicalStrokeCount, regular, forName, jisLevel, direction }: QueryParams,
) =>
  db
    .selectFrom((db) =>
      db
        .selectFrom('kanji')
        .select([kanaTranslate.as('read_front'), 'read', 'code_point'])
        .innerJoin('kanji_read', 'code_point', 'kanji_read.kanji_code_point')
        .if(inRadicalStrokeCount != null, (qb) => qb.where('in_radical_stroke_count', '=', inRadicalStrokeCount!))
        .if(regular !== 'none', (qb) => qb.where('regular', '=', regular === 'true'))
        .if(forName !== 'none', (qb) => qb.where('for_name', '=', forName === 'true'))
        .if(jisLevel != null, (qb) => qb.where('jis_level', '=', jisLevel!))
        .if(!!read, (qb) => qb.where('read', 'like', `${escapeLike(read!)}%`))
        .if(radical != null, (qb) => qb.where('radical_code_point', '=', radical!))
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
