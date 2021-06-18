import { Args, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { GetGlyphwikiGlyphArgs, GlyphwikiGlyph } from '@sin-nihongo/graphql-interfaces';
import { Glyphwiki } from '../services/Glyphwiki';
import { drawNecessaryGlyphs, includeGlyphs } from '../libs/glyph';

@Resolver(() => GlyphwikiGlyph)
export class GlyphqikiResolver {
  @Query(() => GlyphwikiGlyph, { description: 'グリフウィキからグリフお取得する' })
  glyphwiki(@Args() { name }: GetGlyphwikiGlyphArgs) {
    return Glyphwiki.getData(name);
  }

  @FieldResolver(() => [GlyphwikiGlyph], { description: '含むグリフ' })
  includeGlyphs(@Root() glyph: GlyphwikiGlyph) {
    return includeGlyphs(glyph, Glyphwiki.getData);
  }

  @FieldResolver(() => [GlyphwikiGlyph], { description: '描画に必要なグリフ' })
  drawNecessaryGlyphs(@Root() glyph: GlyphwikiGlyph) {
    return drawNecessaryGlyphs(glyph, Glyphwiki.getData);
  }
}
