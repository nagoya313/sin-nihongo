import { type ValidatorData } from 'remix-validated-form';
import { db } from '~/db/db.server';
import GlyphLoader from '~/features/kage/models/GlyphLoader';
import { type Glyph } from '~/features/kage/types';
import { escapeLike } from '~/utils/sql';
import { GLYPH_READ_LIMIT } from './constants';
import { type glyphCreateParams, type glyphsQueryParams } from './validators';

type QueryParams = ValidatorData<typeof glyphsQueryParams>;

export const getGlyphByName = (name: string) =>
  db.selectFrom('glyph').select(['name', 'data']).where('name', '=', name).executeTakeFirst();

export const getGlyph = async (name: string) => (await getGlyphByName(name)) ?? { name, data: null };

export const getDrawableGlyphByName = async (name: string) => {
  const glyph = await getGlyphByName(name);
  if (glyph == null) return null;
  const glyphLoader = new GlyphLoader(getGlyph);
  return { ...glyph, drawNecessaryGlyphs: await glyphLoader.drawNecessaryGlyphs(glyph) };
};

const toDrawableGlyphs = async (glyphs: ReadonlyArray<Glyph>) => {
  // 直列にしないとコネクションプールが盡きる
  const result = [];
  for (const glyph of glyphs) {
    const count = await db
      .selectFrom('glyph')
      .select([db.fn.count('name').as('glyph_count')])
      .where('data', '~', includedGlyphsByNameRegex(glyph.name))
      .executeTakeFirst();
    const glyphLoader = new GlyphLoader(getGlyph);
    result.push({
      ...glyph,
      drawNecessaryGlyphs: await glyphLoader.drawNecessaryGlyphs(glyph),
      deletable: count?.glyph_count === '0',
    });
  }

  return result;
};

const includedGlyphsByNameRegex = (name: string) => `99:.*:${escapeLike(name)}(:|$|[$])`;

const getIncludedGlyphsByName = async (name: string) => {
  const glyphs = await db
    .selectFrom('glyph')
    .select(['name', 'data'])
    .where('data', '~', includedGlyphsByNameRegex(name))
    .execute();

  return toDrawableGlyphs(glyphs);
};

export const getGlyphDetailByName = async (name: string) => {
  const glyph = await getGlyphByName(name);
  if (glyph == null) return null;
  const glyphLoader = new GlyphLoader(getGlyph);
  return {
    ...glyph,
    drawNecessaryGlyphs: await glyphLoader.drawNecessaryGlyphs(glyph),
    includedGlyphs: await getIncludedGlyphsByName(name),
  };
};

export const getGlyphPreview = async (data: string) => {
  const glyph = { name: 'preview', data };
  const glyphLoader = new GlyphLoader(getGlyph);
  const drawNecessaryGlyphs = await glyphLoader.drawNecessaryGlyphs(glyph);
  return { ...glyph, drawNecessaryGlyphs, isDrawable: drawNecessaryGlyphs.every(({ data }) => data != null) };
};

export const getGlyphsOrderByName = ({ q, offset }: QueryParams) =>
  typeof q === 'number'
    ? db
        .selectFrom('glyph')
        .innerJoin('kanji', 'glyph_name', 'name')
        .select(['name', 'data'])
        .if(!!q, (qb) => qb.where('code_point', '=', q))
        .orderBy('name')
        .offset(offset)
        .limit(GLYPH_READ_LIMIT)
        .execute()
    : db
        .selectFrom('glyph')
        .select(['name', 'data'])
        .if(!!q, (qb) => qb.where('name', 'like', `${escapeLike(q!)}%`))
        .orderBy('name')
        .offset(offset)
        .limit(GLYPH_READ_LIMIT)
        .execute();

export const getGlyphs = async (query: QueryParams) => {
  const glyphs = await getGlyphsOrderByName(query);

  return toDrawableGlyphs(glyphs);
};

export const createGlyph = ({ name, data }: ValidatorData<typeof glyphCreateParams>) =>
  db.insertInto('glyph').values({ name, data }).executeTakeFirst();

export const updateGlyph = ({ name, data }: ValidatorData<typeof glyphCreateParams>) =>
  db.updateTable('glyph').set({ data, updated_at: new Date() }).where('name', '=', name).executeTakeFirstOrThrow();

export const deleteGlyph = async (name: string) => {
  const { glyph_count } = await db
    .selectFrom('glyph')
    .select([db.fn.count('name').as('glyph_count')])
    .where('data', '~', includedGlyphsByNameRegex(name))
    .executeTakeFirstOrThrow();
  if (glyph_count !== '0') return { numDeletedRows: BigInt(0) };
  return db.deleteFrom('glyph').where('name', '=', name).executeTakeFirst();
};
