import { Buhin } from '@kurgm/kage-engine';
import { GlyphResponse, GlyphsResponse } from '@sin-nihongo/api-interfaces';

export const splitData = (data: string | undefined) => {
  return data?.split('$')?.map((t, i) => {
    return (
      <span key={i}>
        {t}
        <br />
      </span>
    );
  });
};

export const glyphToBuhin = ({ data, includeGlyphs }: GlyphResponse) => {
  const buhin = new Buhin();
  buhin.push(data.name, data.data);
  includeGlyphs?.forEach((g) => buhin.push(g.name, g.data));
  return buhin;
};

export const glyphsToBuhin = ({ data, includeGlyphs }: GlyphsResponse) => {
  const buhin = new Buhin();
  data.items.forEach((glyph) => {
    buhin.push(glyph.name, glyph.data);
  });
  includeGlyphs?.forEach((glyph) => {
    buhin.push(glyph.name, glyph.data);
  });
  return buhin;
};
