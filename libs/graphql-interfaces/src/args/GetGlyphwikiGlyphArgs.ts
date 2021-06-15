import { ArgsType } from 'type-graphql';
import { GLYPHWIKI_QUERY_PARAMS_MATCHER } from '../lib/const';
import { StringField } from '../lib/decorator';

@ArgsType()
export class GetGlyphwikiGlyphArgs {
  @StringField({ name: '検索ワード', validations: { match: GLYPHWIKI_QUERY_PARAMS_MATCHER } })
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
