import { sql } from 'kysely';
import { type ValidatorData } from 'remix-validated-form';
import { db } from '~/db/db.server';
import { getGlyph, getGlyphByName } from '~/features/glyphs/models/glyph.server';
import GlyphLoader from '~/kage/GlyphLoader';
import { filterPromiseFulfilledResults } from '~/utils/promise';
import { escapeLike } from '~/utils/sql';
import { KANJI_READ_LIMIT } from '../constants';
import { type kanjiGlyphCreateParams, type kanjiQueryParams } from '../validators/params';

type QueryParams = ValidatorData<typeof kanjiQueryParams>;

export const getKanjisOrderByCodePoint = ({
  kanji,
  strokeCount,
  regular,
  forName,
  jisLevel,
  read,
  offset,
}: QueryParams) =>
  db
    .selectFrom('kanji')
    .innerJoin('radical', 'radical.code_point', 'radical_code_point')
    .innerJoin('kanji_read', 'kanji_code_point', 'kanji.code_point')
    .select([
      sql<number>`kanji.code_point`.as('code_point'),
      'kanji.stroke_count',
      'regular',
      'for_name',
      'jis_level',
      'radical_code_point',
      'glyph_name',
      sql<ReadonlyArray<string>>`array_agg(read order by read)`.as('reads'),
    ])
    .if(kanji != null, (qb) => qb.where('kanji.code_point', '=', kanji!))
    .if(strokeCount != null, (qb) => qb.where('kanji.stroke_count', '=', strokeCount!))
    .if(regular !== 'none', (qb) => qb.where('regular', '=', regular === 'true'))
    .if(forName !== 'none', (qb) => qb.where('for_name', '=', forName === 'true'))
    .if(jisLevel != null, (qb) => qb.where('jis_level', '=', jisLevel!))
    .if(!!read, (qb) => qb.where('read', 'like', `${escapeLike(read!)}%`))
    .groupBy('kanji.code_point')
    .orderBy('code_point')
    .offset(offset)
    .limit(KANJI_READ_LIMIT)
    .execute();

export const getKanjis = async (query: QueryParams) => {
  const kanjis = await getKanjisOrderByCodePoint(query);

  console.log(kanjis);

  const result = await Promise.allSettled(
    kanjis.map(async (kanji) => {
      if (kanji.glyph_name == null) return { ...kanji, glyph: null };
      const glyph = await getGlyphByName(kanji.glyph_name);
      if (glyph == null) return { ...kanji, glyph: null };
      const glyphLoader = new GlyphLoader(getGlyph);
      return { ...kanji, glyph: { ...glyph, drawNecessaryGlyphs: await glyphLoader.drawNecessaryGlyphs(glyph) } };
    }),
  );

  return filterPromiseFulfilledResults(result).map(({ value }) => value);
};

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

export const getKanjisOrderByRead = ({ strokeCount, regular, read, direction }: QueryParams) =>
  db
    .selectFrom((db) =>
      db
        .selectFrom('kanji')
        .select([
          sql<string>`translate(left(read, 1), 'ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチッツテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワン', 'ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちっつてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわん')`.as(
            'read_front',
          ),
          'read',
          'code_point',
        ])
        .innerJoin('kanji_read', 'code_point', 'kanji_read.kanji_code_point')
        .if(strokeCount != null, (qb) => qb.where('in_radical_stroke_count', '=', strokeCount!))
        .if(regular !== 'none', (qb) => qb.where('regular', '=', regular === 'true'))
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

export const getKanjiByCodePoint = (codePoint: number) =>
  db
    .selectFrom('kanji')
    .innerJoin('kanji_read', 'kanji.code_point', 'kanji_read.kanji_code_point')
    .select([
      'kanji.stroke_count',
      'kanji.code_point',
      'kanji.radical_code_point',
      'glyph_name',
      sql<ReadonlyArray<string>>`array_agg(distinct read order by read)`.as('reads'),
      sql<string>`chr(kanji.code_point)`.as('kanji'),
      sql<string>`chr(kanji.radical_code_point)`.as('radical'),
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
      .set({ glyph_name: name })
      .where('code_point', '=', codePoint)
      .executeTakeFirstOrThrow();
  });
