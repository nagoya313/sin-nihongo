import { Buffer } from 'buffer';
import { ObjectType } from 'type-graphql';
import { KageGlyph } from './KageGlyph';
import { Node } from './Node';

@ObjectType({ implements: [Node, KageGlyph], description: 'グリフウィキのグリフ' })
export class GlyphwikiGlyph extends KageGlyph implements Node {
  get encodedId() {
    return Buffer.from(`GlyphwikiGlyph:${this.name}`).toString('base64');
  }

  readonly name!: string;
  readonly data!: string;
}
