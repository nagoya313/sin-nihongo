import { sql } from 'kysely';
import { type ValidatorData } from 'remix-validated-form';
import { db } from '~/db/db.server';
import { getDrawableGlyphByName, getGlyph, getGlyphByName } from '~/features/glyphs/repositories.server';
import GlyphLoader from '~/features/kage/models/GlyphLoader';
import { escapeLike, kanaTranslate } from '~/utils/sql';
import { KANJI_READ_LIMIT } from './constants';
import { type kanjiGlyphCreateParams, type kanjiQueryParams, type kanjiUpdateParams } from './validators';

type QueryParams = ValidatorData<typeof kanjiQueryParams>;
type SimpleQueryParams = Pick<
  QueryParams,
  'read' | 'stroke_count' | 'regular' | 'for_name' | 'jis_level' | 'radical' | 'direction'
>;

export const getKanjisOrderByCodePoint = ({
  kanji,
  stroke_count,
  regular,
  for_name,
  jis_level,
  has_glyph,
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
    .if(stroke_count != null, (qb) => qb.where('stroke_count', '=', stroke_count!))
    .if(regular !== 'none', (qb) => qb.where('regular', '=', regular === 'true'))
    .if(for_name !== 'none', (qb) => qb.where('for_name', '=', for_name === 'true'))
    .if(jis_level != null, (qb) => qb.where('jis_level', '=', jis_level!))
    .if(has_glyph !== 'none', (qb) => qb.where('glyph_name', has_glyph === 'true' ? 'is not' : 'is', null))
    .if(radical != null, (qb) => qb.where('radical_code_point', '=', radical!))
    .if(!!read, (qb) => qb.where('read', 'like', `${escapeLike(read!)}%`))
    .groupBy('code_point')
    .orderBy('code_point')
    .offset(offset)
    .limit(KANJI_READ_LIMIT)
    .execute();

export const getDrawableKanjis = async (query: QueryParams) => {
  const kanjis = await getKanjisOrderByCodePoint(query);

  // 直列にしないとコネクションプールが盡きる
  const result = [];
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

export const getKanjisOrderByStrokeCount = ({
  read,
  stroke_count,
  regular,
  for_name,
  jis_level,
  radical,
  direction,
}: SimpleQueryParams) =>
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
    .if(stroke_count != null, (qb) => qb.where('stroke_count', '=', stroke_count!))
    .if(regular !== 'none', (qb) => qb.where('regular', '=', regular === 'true'))
    .if(for_name !== 'none', (qb) => qb.where('for_name', '=', for_name === 'true'))
    .if(jis_level != null, (qb) => qb.where('jis_level', '=', jis_level!))
    .if(radical != null, (qb) => qb.where('radical_code_point', '=', radical!))
    .groupBy('stroke_count')
    .orderBy('stroke_count', direction)
    .execute();

export const getKanjisOrderByRead = ({
  read,
  stroke_count,
  regular,
  for_name,
  jis_level,
  radical,
  direction,
}: SimpleQueryParams) =>
  db
    .selectFrom((db) =>
      db
        .selectFrom('kanji')
        .select([kanaTranslate.as('read_front'), 'read', 'code_point'])
        .innerJoin('kanji_read', 'code_point', 'kanji_read.kanji_code_point')
        .if(stroke_count != null, (qb) => qb.where('stroke_count', '=', stroke_count!))
        .if(regular !== 'none', (qb) => qb.where('regular', '=', regular === 'true'))
        .if(for_name !== 'none', (qb) => qb.where('for_name', '=', for_name === 'true'))
        .if(jis_level != null, (qb) => qb.where('jis_level', '=', jis_level!))
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
      'in_radical_stroke_count',
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

export const getDrawableKanji = async (codePoint: number) => {
  const kanji = (await getKanjiByCodePoint(codePoint))!;
  if (kanji.glyph_name == null) return { ...kanji, glyph: null };
  const glyph = await getDrawableGlyphByName(kanji.glyph_name);

  return { ...kanji, glyph };
};

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

export const getKanjisByGlyphName = (name: string) =>
  db
    .selectFrom('kanji')
    .select(['code_point', sql<string>`chr(kanji.code_point)`.as('kanji')])
    .where('glyph_name', '=', name)
    .execute();

export const updateKanji = (
  codePoint: number,
  { on_reads, kun_reads, radical, ...others }: ValidatorData<typeof kanjiUpdateParams>,
) =>
  db.transaction().execute(async (trx) => {
    await trx
      .deleteFrom('kanji_read')
      .where('kanji_code_point', '=', codePoint)
      .where((qb) => qb.where('read', 'not in', on_reads).orWhere('read', 'not in', kun_reads))
      .executeTakeFirstOrThrow();
    await trx
      .insertInto('kanji_read')
      .values(on_reads.concat(kun_reads).map((read) => ({ read, kanji_code_point: codePoint })))
      .onConflict((oc) =>
        oc.columns(['read', 'kanji_code_point']).doUpdateSet({
          updated_at: new Date(),
        }),
      )
      .executeTakeFirstOrThrow();
    await trx
      .updateTable('kanji')
      .set({ ...others, radical_code_point: radical, updated_at: new Date() })
      .where('code_point', '=', codePoint)
      .executeTakeFirstOrThrow();
  });

export const createKanjiGlyph = ({ glyph_name, data, code_point }: ValidatorData<typeof kanjiGlyphCreateParams>) =>
  db.transaction().execute(async (trx) => {
    await trx.insertInto('glyph').values({ name: glyph_name, data }).executeTakeFirstOrThrow();
    await trx
      .updateTable('kanji')
      .set({ glyph_name, updated_at: new Date() })
      .where('code_point', '=', code_point)
      .executeTakeFirstOrThrow();
  });

export const unlinkKanjiGlyph = async (codePoint: number) =>
  db
    .updateTable('kanji')
    .set({ glyph_name: null, updated_at: new Date() })
    .where('code_point', '=', codePoint)
    .executeTakeFirstOrThrow();
