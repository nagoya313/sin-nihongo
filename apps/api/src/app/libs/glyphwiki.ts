import axios from 'axios';
import { uniq } from 'underscore';
import { KageRecursionData } from '@sin-nihongo/api-interfaces';
import { glyphwikiDataToKageStrokes } from './kage';

const GLYPHWIKI_API_ENDPOINT = 'https://glyphwiki.org/api/glyph';

export interface GlyphwikiData {
  readonly version: number;
  readonly name: string;
  readonly data: string;
  readonly related: string;
}

export const glyphwikiData = async (code: string): Promise<KageRecursionData | undefined> => {
  const base = await glyphwikiDataGet(code);
  if (typeof base.name !== 'undefined' && base.data != null) {
    const glyphs = await recursionData(base);
    return {
      name: code,
      needGlyphs: uniq(
        glyphs.map((glyph) => ({ name: glyph.name, data: glyph.data })),
        'name'
      ),
    };
  }
  return undefined;
};

const glyphwikiDataGet = async (code: string): Promise<GlyphwikiData> => {
  const response = await axios.get<GlyphwikiData>(GLYPHWIKI_API_ENDPOINT, {
    params: {
      name: code,
    },
  });
  // 時々nameに変なものが入つたデータが来る時があつたのでcodeまゝにする
  return {
    version: response.data.version,
    name: code,
    data: response.data.data,
    related: response.data.related,
  };
};

const scanRecursion = async (data: GlyphwikiData) => {
  const linkStrokes = glyphwikiDataToKageStrokes(data).linkStrokes;
  const strokes: (GlyphwikiData | GlyphwikiData[])[] = await Promise.all(
    linkStrokes.map(async (stroke) => {
      const base = await glyphwikiDataGet(stroke.linkStrokeId);
      return recursionData(base);
    })
  );
  const empty: GlyphwikiData | GlyphwikiData[] = [];
  return empty.concat(...strokes);
};

const recursionData = async (data: GlyphwikiData) => {
  const scan = await scanRecursion(data);
  return [data].concat(scan);
};
