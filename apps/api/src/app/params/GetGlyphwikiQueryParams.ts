import { GetGlyphwikiParams } from '@sin-nihongo/sin-nihongo-params';

export class GetGlyphwikiQueryParams extends GetGlyphwikiParams {
  get name() {
    return [...this.q].length === 1 ? `u${this.codePoint()}` : this.q;
  }

  private codePoint() {
    return this.q.codePointAt(0).toString(16).padStart(4, '0');
  }
}
