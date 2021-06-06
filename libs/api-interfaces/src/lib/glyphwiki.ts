import { Matches } from 'class-validator';

const GLYPHWIKI_QUERY_PARAMS_MATCHER = /^([\da-z-_@]+|.)$/;

export class GlyphwikiQueryParams {
  @Matches(GLYPHWIKI_QUERY_PARAMS_MATCHER, { message: `"$value"わ検索不可能なクエリです` })
  q: string;

  get glyphwikiApiRequestParam() {
    return [...this.q].length === 1 ? `u${this.q.codePointAt(0).toString(16).padStart(4, '0')}` : this.q;
  }
}