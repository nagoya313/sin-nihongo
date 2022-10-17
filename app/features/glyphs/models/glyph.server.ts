import { type ValidatorData } from 'remix-validated-form';
import { db } from '~/db/db.server';
import GlyphLoader from '~/kage/GlyphLoader';
import { escapeLike } from '~/utils/sql';
import { GLYPH_READ_LIMIT } from '../constants';
import type { glyphCreateParams } from '../validators/params';
import { type glyphQueryParams } from '../validators/params';

type QueryParams = ValidatorData<typeof glyphQueryParams>;

export const getGlyphByName = (name: string) =>
  db.selectFrom('glyph').select(['name', 'data']).where('name', '=', name).executeTakeFirst();

export const getGlyph = async (name: string) => (await getGlyphByName(name)) ?? { name, data: null };
export const getDrawableGlyphByName = async (name: string) => {
  const glyph = await getGlyphByName(name);
  if (glyph == null) return null;
  const glyphLoader = new GlyphLoader(getGlyph);
  return { ...glyph, drawNecessaryGlyphs: await glyphLoader.drawNecessaryGlyphs(glyph) };
};
export const getGlyphPreview = async (data: string) => {
  const glyph = { name: 'preview', data };
  const glyphLoader = new GlyphLoader(getGlyph);
  const drawNecessaryGlyphs = await glyphLoader.drawNecessaryGlyphs(glyph);
  return { ...glyph, drawNecessaryGlyphs, isDrawable: drawNecessaryGlyphs.every(({ data }) => data != null) };
};

export const getGlyphsOrderByName = ({ q, offset }: QueryParams) =>
  db
    .selectFrom('glyph')
    .select(['name', 'data'])
    .if(!!q, (qb) => qb.where('name', 'like', `${escapeLike(q!)}%`))
    .orderBy('name')
    .offset(offset)
    .limit(GLYPH_READ_LIMIT)
    .execute();

export const getGlyphs = async (query: QueryParams) => {
  const glyphs = await getGlyphsOrderByName(query);

  const result = [];
  // 直列にしないとコネクションプールが盡きる
  for (const glyph of glyphs) {
    const glyphLoader = new GlyphLoader(getGlyph);
    result.push({ ...glyph, drawNecessaryGlyphs: await glyphLoader.drawNecessaryGlyphs(glyph) });
  }

  return result;

  /* const result = await Promise.allSettled(
    glyphs.map(async (glyph) => {
      const glyphLoader = new GlyphLoader(getGlyph);
      return { ...glyph, drawNecessaryGlyphs: await glyphLoader.drawNecessaryGlyphs(glyph) };
    }),
  );

  return filterPromiseFulfilledResults(result).map(({ value }) => value);
  */
};

export const createGlyph = ({ name, data }: ValidatorData<typeof glyphCreateParams>) =>
  db.insertInto('glyph').values({ name, data }).executeTakeFirst();

export const updateGlyph = ({ name, data }: ValidatorData<typeof glyphCreateParams>) =>
  db.updateTable('glyph').set({ data, updated_at: new Date() }).where('name', '=', name).executeTakeFirstOrThrow();

export const deleteGlyph = (name: string) => db.deleteFrom('glyph').where('name', '=', name).executeTakeFirst();
