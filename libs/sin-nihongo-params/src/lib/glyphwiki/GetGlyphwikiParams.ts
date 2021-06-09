import { Matches } from 'class-validator';
import { GetGlyphwikiRequest } from '@sin-nihongo/api-interfaces';

const GLYPHWIKI_QUERY_PARAMS_MATCHER = /^([\da-z-_]+(@\d+)?|.)$/;

export class GetGlyphwikiParams implements GetGlyphwikiRequest {
  @Matches(GLYPHWIKI_QUERY_PARAMS_MATCHER, { message: `"$value"わ検索不可能なクエリです` })
  q: string;
}

export class GetGlyphwikiQueryParams extends GetGlyphwikiParams {
  get name() {
    return [...this.q].length === 1 ? `u${this.codePoint()}` : this.q;
  }

  private codePoint() {
    return this.q.codePointAt(0).toString(16).padStart(4, '0');
  }
}
