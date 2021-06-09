import { GlyphwikiSearchParams } from '@sin-nihongo/api-interfaces';

export class GlyphwikiQueryParams {
  constructor(private params: GlyphwikiSearchParams) {}

  get name() {
    return [...this.params.q].length === 1 ? `u${this.codePoint()}` : this.params.q;
  }

  private codePoint() {
    return this.params.q.codePointAt(0).toString(16).padStart(4, '0');
  }
}
