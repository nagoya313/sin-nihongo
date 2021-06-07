import { Matches } from 'class-validator';
import { Message } from './api-interfaces';

const GLYPHWIKI_QUERY_PARAMS_MATCHER = /^([\da-z-_]+(@\d+)?|.)$/;

export class GlyphwikiQueryParams {
  @Matches(GLYPHWIKI_QUERY_PARAMS_MATCHER, { message: `"$value"わ検索不可能なクエリです` })
  q: string;

  get glyphwikiApiRequestParam() {
    return [...this.q].length === 1 ? `u${this.codePoint()}` : this.q;
  }

  private codePoint() {
    return this.q.codePointAt(0).toString(16).padStart(4, '0');
  }
}

export interface GlyphwikiHealth extends Message {
  accessible: boolean;
}
