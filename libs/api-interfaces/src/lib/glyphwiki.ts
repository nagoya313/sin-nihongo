import { Matches } from 'class-validator';
import { Message } from './message';

const GLYPHWIKI_QUERY_PARAMS_MATCHER = /^([\da-z-_]+(@\d+)?|.)$/;

export class GlyphwikiSearchParams {
  @Matches(GLYPHWIKI_QUERY_PARAMS_MATCHER, { message: `"$value"わ検索不可能なクエリです` })
  q: string;
}

export interface GlyphwikiHealthResponse extends Message {
  readonly accessible: boolean;
}
