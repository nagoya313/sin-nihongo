import { Matches } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { GLYPHWIKI_QUERY_PARAMS_MATCHER } from '../lib/const';

@ArgsType()
export class GetGlyphwikiGlyphArgs {
  @Field({ description: '検索ワード' })
  @Matches(GLYPHWIKI_QUERY_PARAMS_MATCHER, { message: `"$value"わ検索不可能なクエリです` })
  q!: string;

  get name() {
    return [...this.q].length === 1 ? `u${this.codePoint()}` : this.q;
  }

  private codePoint() {
    const code = this.q.codePointAt(0);
    if (code != null) {
      return code.toString(16).padStart(4, '0');
    }
    throw TypeError;
  }
}
