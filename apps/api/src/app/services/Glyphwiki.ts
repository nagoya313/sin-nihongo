import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { GlyphwikiGlyph } from '@sin-nihongo/graphql-interfaces';

const GLYPHWIKI_API_ENDPOINT = 'https://glyphwiki.org/api/glyph';

interface GlyphwikiData {
  readonly version: number;
  readonly name: string;
  readonly data: string;
  readonly related: string;
}

type GlyphwikiHealth = Record<string, never>;

export class Glyphwiki {
  static async getData(name: string) {
    const response = await axios.get<GlyphwikiData>(GLYPHWIKI_API_ENDPOINT, {
      params: { name: name },
    });
    // 見つからなかつた時？には{}だけではなく
    // {"version":null,"related":null,"data":null,"name":"uuuuuuu"}等
    // 等のjsonが返つてくることがある
    const plain =
      !response.data.name || !response.data.data
        ? // responseを検討
          { name: name, data: 'グリフウィキからグリフが見つかりませんでした' }
        : // バージョン名@附きで検索結果を取得した場合、nameに@はつかないので検索codeの方を返す
          { name: name, data: response.data.data };
    return plainToClass(GlyphwikiGlyph, plain);
  }

  static async health() {
    try {
      const response = await axios.get<GlyphwikiHealth>(GLYPHWIKI_API_ENDPOINT);
      if (Object.keys(response.data).length === 0) {
        return true;
      }
    } catch (error) {
      console.error('glyphwiki access error.');
    }
    return false;
  }
}
