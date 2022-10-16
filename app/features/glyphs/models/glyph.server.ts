import { type ValidatorData } from 'remix-validated-form';
import { db } from '~/db/db.server';
import GlyphLoader from '~/kage/GlyphLoader';
import { escapeLike } from '~/utils/sql';
import { type UnionSelect } from '~/utils/types';
import { GLYPH_READ_LIMIT } from '../constants';
import type { glyphCreateParams } from '../validators/params';
import { type glyphQueryParams } from '../validators/params';

type QueryParams = ValidatorData<typeof glyphQueryParams>;

const getGlyph = async (name: string) =>
  (await db
    .selectFrom('glyph')
    .select(['name', 'data'])
    .where('name', '=', name)
    .orderBy('name')
    .executeTakeFirst()) ?? {
    name,
    data: null,
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

  return (result.filter(({ status }) => status === 'fulfilled') as UnionSelect<typeof result[number], 'value'>[]).map(
    ({ value }) => value,
  );
};

export const createGlyph = ({ name, data }: ValidatorData<typeof glyphCreateParams>) =>
  db.insertInto('glyph').values({ name, data }).execute();

export const deleteGlyph = (name: string) => db.deleteFrom('glyph').where('name', '=', name).execute();
