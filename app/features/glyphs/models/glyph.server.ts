import { type ValidatorData } from 'remix-validated-form';
import { db } from '~/db/db.server';
import GlyphLoader from '~/kage/GlyphLoader';
import { filterPromiseFulfilledResults } from '~/utils/promise';
import { escapeLike } from '~/utils/sql';
import { GLYPH_READ_LIMIT } from '../constants';
import type { glyphCreateParams } from '../validators/params';
import { type glyphQueryParams } from '../validators/params';

type QueryParams = ValidatorData<typeof glyphQueryParams>;

export const getGlyphByName = (name: string) =>
  db.selectFrom('glyph').select(['name', 'data']).where('name', '=', name).executeTakeFirst();

export const getGlyph = async (name: string) => (await getGlyphByName(name)) ?? { name, data: null };
export const getGlyphPreview = async (data: string) => {
  const glyph = { name: 'preview', data };
  const glyphLoader = new GlyphLoader(getGlyph);
  const drawNecessaryGlyphs = await glyphLoader.drawNecessaryGlyphs(glyph);
  return { ...glyph, drawNecessaryGlyphs, isDrawable: drawNecessaryGlyphs.every(({ data }) => data != null) };
};

export const getGlyphs = async ({ q, offset }: QueryParams) => {
  const glyphs = await db
    .selectFrom('glyph')
    .select(['name', 'data'])
    .if(!!q, (qb) => qb.where('name', 'like', `${escapeLike(q!)}%`))
    .orderBy('name')
    .offset(offset)
    .limit(GLYPH_READ_LIMIT)
    .execute();

  const result = await Promise.allSettled(
    glyphs.map(async (glyph) => {
      const glyphLoader = new GlyphLoader(getGlyph);
      return { ...glyph, drawNecessaryGlyphs: await glyphLoader.drawNecessaryGlyphs(glyph) };
    }),
  );

  return filterPromiseFulfilledResults(result).map(({ value }) => value);
};

export const createGlyph = ({ name, data }: ValidatorData<typeof glyphCreateParams>) =>
  db.insertInto('glyph').values({ name, data }).executeTakeFirst();

export const deleteGlyph = (name: string) => db.deleteFrom('glyph').where('name', '=', name).executeTakeFirst();
