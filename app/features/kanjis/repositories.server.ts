import { sql } from 'kysely';
import { type ValidatorData } from 'remix-validated-form';
import { db } from '~/db/db.server';
import { getGlyph, getGlyphByName } from '~/features/glyphs/repositories.server';
import GlyphLoader from '~/features/kage/models/GlyphLoader';
import { escapeLike, kanaTranslate } from '~/utils/sql';
import { KANJI_READ_LIMIT } from './constants';
import { type kanjiGlyphCreateParams, type kanjiQueryParams } from './validators';

type QueryParams = ValidatorData<typeof kanjiQueryParams>;
type SimpleQueryParams = Pick<
  QueryParams,
  'read' | 'strokeCount' | 'inRadicalStrokeCount' | 'regular' | 'forName' | 'jisLevel' | 'radical' | 'direction'
>;

export const getKanjisOrderByCodePoint = ({
  kanji,
  strokeCount,
  regular,
  forName,
  jisLevel,
  hasGlyph,
  read,
  radical,
  offset,
}: QueryParams) =>
  db
    .selectFrom('kanji')
    .innerJoin('kanji_read', 'kanji_code_point', 'kanji.code_point')
    .select([
      'code_point',
      'stroke_count',
      'regular',
      'for_name',
      'jis_level',
      'radical_code_point',
      'glyph_name',
      sql<ReadonlyArray<string>>`array_agg(read order by read)`.as('reads'),
    ])
    .if(kanji != null, (qb) => qb.where('code_point', '=', kanji!))
    .if(strokeCount != null, (qb) => qb.where('stroke_count', '=', strokeCount!))
    .if(regular !== 'none', (qb) => qb.where('regular', '=', regular === 'true'))
    .if(forName !== 'none', (qb) => qb.where('for_name', '=', forName === 'true'))
    .if(jisLevel != null, (qb) => qb.where('jis_level', '=', jisLevel!))
    .if(hasGlyph !== 'none', (qb) => qb.where('glyph_name', hasGlyph === 'true' ? 'is not' : 'is', null))
    .if(radical != null, (qb) => qb.where('radical_code_point', '=', radical!))
    .if(!!read, (qb) => qb.where('read', 'like', `${escapeLike(read!)}%`))
    .groupBy('code_point')
    .orderBy('code_point')
    .offset(offset)
    .limit(KANJI_READ_LIMIT)
    .execute();

export const getKanjis = async (query: QueryParams) => {
  const kanjis = await getKanjisOrderByCodePoint(query);

  const result = [];
  // 直列にしないとコネクションプールが盡きる
  for (const kanji of kanjis) {
    if (kanji.glyph_name == null) {
      result.push({ ...kanji, glyph: null });
    } else {
      const glyph = await getGlyphByName(kanji.glyph_name);
      if (glyph == null) {
        result.push({ ...kanji, glyph: null });
      } else {
        const glyphLoader = new GlyphLoader(getGlyph);
        result.push({
          ...kanji,
          glyph: { ...glyph, drawNecessaryGlyphs: await glyphLoader.drawNecessaryGlyphs(glyph) },
        });
      }
    }
  }

  return result;
};

const getKanjisOrderByStrokeCountBase = <TOrder extends 'stroke_count' | 'in_radical_stroke_count'>(
  { read, strokeCount, inRadicalStrokeCount, regular, forName, jisLevel, radical, direction }: SimpleQueryParams,
  order: TOrder,
) =>
  db
    .selectFrom('kanji')
    .select([
      order,
      sql<ReadonlyArray<number>>`array_agg(code_point order by radical_code_point, code_point)`.as('code_points'),
    ])
    .if(!!read, (qb) =>
      qb
        .innerJoin('kanji_read', 'kanji.code_point', 'kanji_read.kanji_code_point')
        .where('read', 'like', `${escapeLike(read!)}%`),
    )
    .if(strokeCount != null, (qb) => qb.where('stroke_count', '=', strokeCount!))
    .if(inRadicalStrokeCount != null, (qb) => qb.where('in_radical_stroke_count', '=', inRadicalStrokeCount!))
    .if(regular !== 'none', (qb) => qb.where('regular', '=', regular === 'true'))
    .if(forName !== 'none', (qb) => qb.where('for_name', '=', forName === 'true'))
    .if(jisLevel != null, (qb) => qb.where('jis_level', '=', jisLevel!))
    .if(radical != null, (qb) => qb.where('radical_code_point', '=', radical!))
    .groupBy(order)
    .orderBy(order, direction)
    .execute();

export const getKanjisOrderByStrokeCount = (params: SimpleQueryParams) =>
  getKanjisOrderByStrokeCountBase(params, 'stroke_count');

export const getKanjisOrderByInRadicalStrokeCount = (params: SimpleQueryParams) =>
  getKanjisOrderByStrokeCountBase(params, 'in_radical_stroke_count');

export const getKanjisOrderByRead = ({
  read,
  strokeCount,
  inRadicalStrokeCount,
  regular,
  forName,
  jisLevel,
  radical,
  direction,
}: SimpleQueryParams) =>
  db
    .selectFrom((db) =>
      db
        .selectFrom('kanji')
        .select([kanaTranslate.as('read_front'), 'read', 'code_point'])
        .innerJoin('kanji_read', 'code_point', 'kanji_read.kanji_code_point')
        .if(strokeCount != null, (qb) => qb.where('stroke_count', '=', strokeCount!))
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

export const getKanjiByCodePoint = (codePoint: number) =>
  db
    .selectFrom('kanji')
    .innerJoin('kanji_read', 'kanji.code_point', 'kanji_read.kanji_code_point')
    .select([
      'code_point',
      'stroke_count',
      'regular',
      'for_name',
      'jis_level',
      'radical_code_point',
      'glyph_name',
      sql<ReadonlyArray<string>>`array_agg(distinct read order by read)`.as('reads'),
      sql<string>`chr(kanji.code_point)`.as('kanji'),
    ])
    .where('kanji.code_point', '=', codePoint)
    .groupBy('kanji.code_point')
    .executeTakeFirst();

export const getSameKanjs = ({
  code_point,
  glyph_name,
}: NonNullable<Awaited<ReturnType<typeof getKanjiByCodePoint>>>) =>
  db
    .selectFrom('kanji')
    .select([sql<string>`chr(code_point)`.as('kanji')])
    .where('glyph_name', 'is not', null)
    .where('glyph_name', '=', glyph_name)
    .where('code_point', '!=', code_point)
    .orderBy('code_point')
    .execute();

export const createKanjiGlyph = async ({ name, data, codePoint }: ValidatorData<typeof kanjiGlyphCreateParams>) =>
  db.transaction().execute(async (trx) => {
    await trx.insertInto('glyph').values({ name, data }).executeTakeFirstOrThrow();
    await trx
      .updateTable('kanji')
      .set({ glyph_name: name, updated_at: new Date() })
      .where('code_point', '=', codePoint)
      .executeTakeFirstOrThrow();
  });

export const unlinkKanjiGlyph = async (codePoint: number) =>
  await db
    .updateTable('kanji')
    .set({ glyph_name: null, updated_at: new Date() })
    .where('code_point', '=', codePoint)
    .executeTakeFirstOrThrow();
