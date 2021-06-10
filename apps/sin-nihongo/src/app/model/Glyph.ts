import { Glyph as ApiGlyph } from '@sin-nihongo/api-interfaces';

export class Glyph {
  constructor(glyph: ApiGlyph) {
    this.name = glyph.name;
    this.data = glyph.data;
  }

  get glyphwikiLink() {
    return `https://glyphwiki.org/wiki/${this.name}`;
  }

  readonly name: string;
  readonly data: string;
}
