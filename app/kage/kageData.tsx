import { Buhin } from '@kurgm/kage-engine';
import { type glyphwiki } from '~/features/glyphwiki/models/glyphwiki.server';

export const glyphToBuhin = ({ name, data, drawNecessaryGlyphs }: Awaited<ReturnType<typeof glyphwiki>>) => {
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