import { Buhin, Kage, Polygons } from '@kurgm/kage-engine';
import { type ReadonlyDeep } from 'type-fest';
import { type Glyph } from '../types';

export type DrawableGlyph = ReadonlyDeep<{
  name: string;
  data: string | null;
  drawNecessaryGlyphs: Glyph[];
}>;

export const glyphsToBuhin = (glyphs: ReadonlyArray<Glyph>, buhin = new Buhin()) => {
  glyphs.forEach((glyph) => {
    if (glyph.data != null) {
      buhin.push(glyph.name, glyph.data);
    }
  });
  return buhin;
};

export const glyphToBuhin = ({ name, data, drawNecessaryGlyphs }: DrawableGlyph) => {
  const buhin = new Buhin();
  if (data != null) {
    buhin.push(name, data);
    glyphsToBuhin(drawNecessaryGlyphs, buhin);
  }
  return buhin;
};

export const getGlyphCanvasProps = (glyph: DrawableGlyph | null | undefined) => ({
  name: glyph?.name,
  buhin: glyph != null ? glyphToBuhin(glyph) : undefined,
});

export const makeGlyph = (name: string, buhin: Buhin) => {
  const kage = new Kage();
  kage.kBuhin = buhin;
  const polygons = new Polygons();
  kage.makeGlyph(polygons, name);
  return polygons;
};

export const toSVG = (name: string, buhin: Buhin) => makeGlyph(name, buhin).generateSVG();
