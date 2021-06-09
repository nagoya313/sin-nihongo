import { uniq, flatten } from 'underscore';
import { Glyph, GlyphResponse } from '@sin-nihongo/api-interfaces';
import { KageStrokes } from './kage/KageStrokes';

type GetterType = (key: string) => Promise<Glyph>;

export const glyphData = async (key: string, getter: GetterType, firstGetter = getter): Promise<GlyphResponse> => {
  const base = await firstGetter(key);
  return {
    data: base,
    includeGlyphs: await includeGlyphData(base, getter),
  };
};

export const includeGlyphData = async (data: Glyph, getter: GetterType): Promise<Glyph[]> => {
  const glyphs = await firstRecursionData(data, getter);
  return uniq(glyphs, 'name');
};

const scanRecursion = async (data: Glyph, getter: GetterType) => {
  const linkStrokes = new KageStrokes(data.data).linkStrokes;
  const strokes = await Promise.all(
    linkStrokes.map(async (stroke) => {
      const base = await getter(stroke.linkStrokeId);
      return recursionData(base, getter);
    })
  );
  return flatten(strokes);
};

const firstRecursionData = async (data: Glyph, getter: GetterType) => await scanRecursion(data, getter);

const recursionData = async (data: Glyph, getter: GetterType): Promise<Glyph[]> => {
  const scan = await scanRecursion(data, getter);
  return [data].concat(scan);
};
