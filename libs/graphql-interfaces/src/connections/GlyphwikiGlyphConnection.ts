import { Field, Int, ObjectType } from 'type-graphql';
import { Strokes } from '@sin-nihongo/kage';
import { GlyphwikiGlyph } from '../types/GlyphwikiGlyph';

@ObjectType({ isAbstract: true })
abstract class GlyphwikiGlyphConnection {
  @Field(() => [GlyphwikiGlyph])
  readonly nodes!: GlyphwikiGlyph[];

  readonly root!: GlyphwikiGlyph;
}

@ObjectType()
export class GlyphwikiGlyphIncludeConnection extends GlyphwikiGlyphConnection {
  @Field(() => Int)
  get totalCount() {
    return new Strokes(this.root).linkStrokes.length;
  }
}

@ObjectType()
export class GlyphwikiGlyphDrawNecessaryConnection extends GlyphwikiGlyphConnection {
  @Field(() => Int)
  readonly totalCount!: number;
}
