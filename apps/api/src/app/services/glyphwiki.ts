import axios from 'axios';
import { NotFoundError } from 'routing-controllers';
import { Glyph, GlyphwikiHealth as ApiGlyphwikiHealth } from '@sin-nihongo/api-interfaces';

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
  // 見つからなかつた時？には{}だけではなく
  // {"version":null,"related":null,"data":null,"name":"uuuuuuu"}等
  // 等のjsonが返つてくることがある
  if (!response.data.name || !response.data.data) {
    throw new NotFoundError(`"${code}"のグリフわグリフウィキから見つかりませんでした。`);
  }
  // バージョン名@附きで検索結果を取得した場合、nameに@はつかないので検索codeの方を返す
  return { name: code, data: response.data.data };
};

type GlyphwikiHealth = Record<string, never>;

export const glyphwikiHelth = async (): Promise<ApiGlyphwikiHealth> => {
  try {
    const response = await axios.get<GlyphwikiHealth>(GLYPHWIKI_API_ENDPOINT);
    if (Object.keys(response.data).length === 0) {
      return { message: 'Glyphwikiから検索わ利用可能です。', accessible: true };
    }
  } catch (error) {
    console.error('glyphwiki access error.');
  }
  return { message: 'Glyphwikiから検索わ利用不能です。', accessible: false };
};
