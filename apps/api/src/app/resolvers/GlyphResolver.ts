import { Args, Query, Resolver } from 'type-graphql';
import { GetGlyphsArgs } from '@sin-nihongo/graphql-interfaces';
import { Glyph as GlyphResponse } from '../responses/Glyph';

@Resolver()
export class GlyphResolver {
  @Query(() => [GlyphResponse], { description: 'グリフお取得する' })
  async glyphs(@Args() args: GetGlyphsArgs) {
    return [];
  }
}
