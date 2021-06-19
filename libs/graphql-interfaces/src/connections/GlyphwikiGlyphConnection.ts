import { Field, Int, ObjectType } from 'type-graphql';
import { Strokes } from '@sin-nihongo/kage';
import { GlyphwikiGlyph } from '../types/GlyphwikiGlyph';

@ObjectType({ isAbstract: true })
abstract class GlyphwikiGlyphConnection {
  @Field(() => [GlyphwikiGlyph], { description: 'グリフ一覧' })
  readonly nodes!: GlyphwikiGlyph[];

  @Field(() => Int, { description: 'グリフ総数' })
  abstract readonly totalCount: number;

  readonly root!: GlyphwikiGlyph;
}

@ObjectType()
export class GlyphwikiGlyphIncludeConnection extends GlyphwikiGlyphConnection {
  get totalCount() {
    return new Strokes(this.root).linkStrokes.length;
  }
}

@ObjectType()
export class GlyphwikiGlyphDrawNecessaryConnection extends GlyphwikiGlyphConnection {
  readonly totalCount!: number;
}
