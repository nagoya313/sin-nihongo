import { Matches } from 'class-validator';
import { GLYPHWIKI_QUERY_PARAMS_MATCHER } from '@sin-nihongo/api-interfaces';

export class GlyphwikiQueryParams {
  @Matches(GLYPHWIKI_QUERY_PARAMS_MATCHER, { message: `"$value"は検索不可能なクエリです。` })
  readonly q: string;

  get glyphwikiApiRequestParam() {
    return this.q.length === 1 ? `u${this.q.charCodeAt(0).toString(16)}` : this.q;
  }
}
