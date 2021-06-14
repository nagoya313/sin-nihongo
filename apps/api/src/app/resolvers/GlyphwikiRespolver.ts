import { Args, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { GetGlyphwikiGlyphArgs } from '@sin-nihongo/graphql-interfaces';
import { GlyphwikiGlyph } from '../responses/Glyph';
import { Glyphwiki } from '../services/Glyphwiki';
import { includeGlyphData } from '../libs/glyph';

@Resolver(() => GlyphwikiGlyph)
export class GlyphqikiResolver {
  @Query(() => GlyphwikiGlyph, { description: 'グリフウィキからグリフお取得する' })
  glyphwiki(@Args() { name }: GetGlyphwikiGlyphArgs) {
    return Glyphwiki.getData(name);
  }

  @FieldResolver(() => GlyphwikiGlyph)
  async includes(@Root() glyph: GlyphwikiGlyph) {
    return await includeGlyphData(glyph, Glyphwiki.getData);
  }
}
