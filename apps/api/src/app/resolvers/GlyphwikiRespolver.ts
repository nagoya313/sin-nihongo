import { Args, FieldResolver, Query, Resolver, Root, ResolverInterface } from 'type-graphql';
import {
  GlyphwikiGlyph,
  GetGlyphwikiGlyphArgs,
  GlyphwikiGlyphIncludeConnection,
  GlyphwikiGlyphDrawNecessaryConnection,
} from '@sin-nihongo/graphql-interfaces';
import { GlyphLoader } from '@sin-nihongo/kage';
import { Glyphwiki } from '../services/Glyphwiki';

@Resolver(() => GlyphwikiGlyph)
export class GlyphqikiResolver {
  @Query(() => GlyphwikiGlyph, { description: 'グリフウィキからグリフお取得する', complexity: 10 })
  glyphwiki(@Args() { name }: GetGlyphwikiGlyphArgs) {
    return Glyphwiki.getData(name);
  }

  @FieldResolver(() => GlyphwikiGlyphIncludeConnection, { description: '含むグリフ' })
  includeGlyphs(@Root() glyph: GlyphwikiGlyph) {
    return { root: glyph };
  }

  @FieldResolver(() => GlyphwikiGlyphDrawNecessaryConnection, { description: '描画に必要なグリフ', complexity: 100 })
  async drawNecessaryGlyphs(@Root() glyph: GlyphwikiGlyph) {
    const glyphs = await this.loader.drawNecessaryGlyphs(glyph);
    return { totalCount: glyphs.length, nodes: glyphs };
  }

  private loader = new GlyphLoader(Glyphwiki.getData);
}

@Resolver(() => GlyphwikiGlyphIncludeConnection)
export class GlyphwikiGlyphConnectionResolver implements ResolverInterface<GlyphwikiGlyphIncludeConnection> {
  @FieldResolver(() => [GlyphwikiGlyph], { complexity: 50 })
  nodes(@Root() glyph: GlyphwikiGlyphIncludeConnection) {
    return this.loader.includeGlyphs(glyph.root);
  }

  private loader = new GlyphLoader(Glyphwiki.getData);
}
