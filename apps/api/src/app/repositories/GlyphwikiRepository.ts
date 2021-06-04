import axios from 'axios';
import { NotFoundError } from 'routing-controllers';
import { Glyph } from '@sin-nihongo/api-interfaces';
import { GlyphwikiQueryParams } from '../forms/GlyphwikiForm';
import { glyphData } from '../libs/glyph';

const GLYPHWIKI_API_ENDPOINT = 'https://glyphwiki.org/api/glyph';

interface GlyphwikiData {
  readonly version: number;
  readonly name: string;
  readonly data: string;
  readonly related: string;
}

export const glyphwikiDataGet = async (code: string): Promise<Glyph> => {
  const response = await axios.get<GlyphwikiData>(GLYPHWIKI_API_ENDPOINT, {
    params: { name: code },
  });
  if (!response.data.name || !response.data.data) {
    throw new NotFoundError(`"${code}"のグリフわグリフウィキから見つかりませんでした。`);
  }
  // 時々nameに変なものが入つたデータが来る時があつたのでcodeまゝにする
  return { name: code, data: response.data.data };
};

export class GlyphwikiRepository {
  static async findOne(params: GlyphwikiQueryParams) {
    return glyphData(params.glyphwikiApiRequestParam, glyphwikiDataGet);
  }
}
