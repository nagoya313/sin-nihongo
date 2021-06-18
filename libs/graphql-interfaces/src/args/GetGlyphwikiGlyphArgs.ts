import { ArgsType, Field } from 'type-graphql';
import * as Jf from 'joiful';
import { GLYPHWIKI_QUERY_PARAMS_MATCHER } from './const';

@ArgsType()
export class GetGlyphwikiGlyphArgs {
  @Field({ description: '検索ワード' })
  @(Jf.string().required().regex(GLYPHWIKI_QUERY_PARAMS_MATCHER))
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
