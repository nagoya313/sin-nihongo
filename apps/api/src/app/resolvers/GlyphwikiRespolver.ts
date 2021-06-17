import { Args, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { GetGlyphwikiGlyphArgs, GlyphwikiGlyph } from '@sin-nihongo/graphql-interfaces';
import { Glyphwiki } from '../services/Glyphwiki';
import { includeGlyphs } from '../libs/glyph';

@Resolver(() => GlyphwikiGlyph)
export class GlyphqikiResolver {
  @Query(() => GlyphwikiGlyph, { description: 'グリフウィキからグリフお取得する' })
  glyphwiki(@Args() { name }: GetGlyphwikiGlyphArgs) {
    return Glyphwiki.getData(name);
  }

  /*@FieldResolver(() => GlyphwikiGlyph)
  async includes(@Root() glyph: GlyphwikiGlyph) {
    return await includeGlyphs(glyph, Glyphwiki.getData);
  }*/
}
