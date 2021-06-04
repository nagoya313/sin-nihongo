import { uniq } from 'underscore';
import { Glyph } from '@sin-nihongo/api-interfaces';
import { KageStrokes } from './kage/KageStrokes';

type Getter = (key: string) => Promise<Glyph>;

export const glyphData = async (key: string, getter: Getter, firstGetter = getter): Promise<Glyph> => {
  const base = await firstGetter(key);
  return {
    name: base.name,
    data: base.data,
    includeGlyphs: await includesGlyphData(base, getter),
  };
};

export const includesGlyphData = async (data: Glyph, getter: Getter): Promise<Glyph[]> => {
  const glyphs = await firstRecursionData(data, getter);
  return uniq(
    glyphs.map((glyph) => ({ name: glyph.name, data: glyph.data })),
    'name'
  );
};

const scanRecursion = async (data: Glyph, getter: Getter) => {
  const linkStrokes = new KageStrokes(data.data).linkStrokes;
  const strokes: (Glyph | Glyph[])[] = await Promise.all(
    linkStrokes.map(async (stroke) => {
      const base = await getter(stroke.linkStrokeId);
      return recursionData(base, getter);
    })
  );
  const empty: Glyph | Glyph[] = [];
  return empty.concat(...strokes);
};

const firstRecursionData = async (data: Glyph, getter: Getter) => await scanRecursion(data, getter);

const recursionData = async (data: Glyph, getter: Getter) => {
  const scan = await scanRecursion(data, getter);
  return [data].concat(scan);
};
