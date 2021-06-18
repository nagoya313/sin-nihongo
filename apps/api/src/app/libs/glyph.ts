import { uniq, flatten } from 'underscore';
import { KageGlyph } from '@sin-nihongo/graphql-interfaces';
import { KageStrokes } from './kage/KageStrokes';

type GetterType<Glyph> = (key: string) => Promise<Glyph>;

export const includeGlyphs = async <Glyph extends KageGlyph>(
  data: Glyph,
  getter: GetterType<Glyph>
): Promise<Glyph[]> => {
  const linkStrokes = new KageStrokes(data.data).linkStrokes;
  return await Promise.all(linkStrokes.map(async (stroke) => await getter(stroke.linkStrokeId)));
};

export const drawNecessaryGlyphs = async <Glyph extends KageGlyph>(data: Glyph, getter: GetterType<Glyph>) =>
  uniq(await scanRecursion(data, getter), 'name');

const scanRecursion = async <Glyph extends KageGlyph>(data: Glyph, getter: GetterType<Glyph>) => {
  const linkStrokes = new KageStrokes(data.data).linkStrokes;
  const strokes = await Promise.all(
    linkStrokes.map(async (stroke) => {
      const base = await getter(stroke.linkStrokeId);
      return recursionData(base, getter);
    })
  );
  return flatten(strokes);
};

const recursionData = async <Glyph extends KageGlyph>(data: Glyph, getter: GetterType<Glyph>): Promise<Glyph[]> => {
  const scan = await scanRecursion(data, getter);
  return [data].concat(scan);
};
