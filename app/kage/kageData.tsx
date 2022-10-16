import { Buhin, Kage, Polygons } from '@kurgm/kage-engine';
import { type getGlyphwiki } from '~/features/glyphwiki/models/glyphwiki.server';

export const glyphToBuhin = ({ name, data, drawNecessaryGlyphs }: Awaited<ReturnType<typeof getGlyphwiki>>) => {
  const buhin = new Buhin();
  if (data != null) {
    buhin.push(name, data);
    drawNecessaryGlyphs.forEach((glyph) => {
      if (glyph.data != null) {
        buhin.push(glyph.name, glyph.data);
      }
    });
  }
  return buhin;
};

export const makeGlyph = (name: string, buhin: Buhin) => {
  const kage = new Kage();
  kage.kBuhin = buhin;
  const polygons = new Polygons();
  kage.makeGlyph(polygons, name);
  return polygons;
};
