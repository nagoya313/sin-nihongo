import { Args, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { GetGlyphwikiGlyphArgs, GlyphwikiGlyph } from '@sin-nihongo/graphql-interfaces';
import { drawNecessaryGlyphs, includeGlyphs } from '@sin-nihongo/kage';
import { Glyphwiki } from '../services/Glyphwiki';

@Resolver(() => GlyphwikiGlyph)
export class GlyphqikiResolver {
  @Query(() => GlyphwikiGlyph, { description: 'グリフウィキからグリフお取得する', complexity: 10 })
  glyphwiki(@Args() { name }: GetGlyphwikiGlyphArgs) {
    return Glyphwiki.getData(name);
  }

  @FieldResolver(() => [GlyphwikiGlyph], { description: '含むグリフ', complexity: 50 })
  includeGlyphs(@Root() glyph: GlyphwikiGlyph) {
    return includeGlyphs(glyph, Glyphwiki.getData);
  }

  @FieldResolver(() => [GlyphwikiGlyph], { description: '描画に必要なグリフ', complexity: 100 })
  drawNecessaryGlyphs(@Root() glyph: GlyphwikiGlyph) {
    return drawNecessaryGlyphs(glyph, Glyphwiki.getData);
  }
}
