import { Buhin } from '@kurgm/kage-engine';
import { Glyph } from '@sin-nihongo/api-interfaces';

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

export const glyphToBuhin = (glyph: Glyph) => {
  const buhin = new Buhin();
  buhin.push(glyph.name, glyph.data);
  glyph.includeGlyphs?.forEach((g) => buhin.push(g.name, g.data));
  return buhin;
};
