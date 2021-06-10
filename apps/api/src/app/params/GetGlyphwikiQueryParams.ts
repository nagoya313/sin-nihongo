import { GetGlyphwikiParams } from '@sin-nihongo/sin-nihongo-params';

export class GetGlyphwikiQueryParams extends GetGlyphwikiParams {
  get name() {
    return [...this.q].length === 1 ? `u${this.codePoint()}` : this.q;
  }

  private codePoint() {
    // qのバリデージョン的に非undefinedを保証してゐる筈
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.q.codePointAt(0)!.toString(16).padStart(4, '0');
  }
}
