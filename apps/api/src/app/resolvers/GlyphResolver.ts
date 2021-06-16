import { Args, Query, Resolver } from 'type-graphql';
import { GetGlyphsArgs } from '@sin-nihongo/graphql-interfaces';
import { Glyph } from '../entities/mongo/Glyph';

@Resolver()
export class GlyphResolver {
  @Query(() => [Glyph], { description: 'グリフお取得する' })
  async glyphs(@Args() args: GetGlyphsArgs) {
    return [];
  }
}
