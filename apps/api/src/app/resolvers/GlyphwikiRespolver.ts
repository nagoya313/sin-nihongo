import { Args, ArgsType, Field, InterfaceType, ObjectType, Query, Resolver } from 'type-graphql';
import { GetGlyphwikiParams } from '@sin-nihongo/sin-nihongo-params';
import { Glyphwiki } from '../services/Glyphwiki';
import { includeGlyphData } from '../libs/glyph';

@ArgsType()
export class GetGlyphwikiArgs extends GetGlyphwikiParams {
  @Field()
  q!: string;

  get name() {
    return [...this.q].length === 1 ? `u${this.codePoint()}` : this.q;
  }

  private codePoint() {
    // qのバリデージョン的に非undefinedを保証してゐる筈
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.q.codePointAt(0)!.toString(16).padStart(4, '0');
  }
}

@InterfaceType()
abstract class IGlyph {
  @Field()
  name!: string;

  @Field()
  data!: string;
}

@ObjectType({ implements: IGlyph })
export class Glyph extends IGlyph {}

@ObjectType({ implements: IGlyph })
export class GlyphwikiGlyph extends IGlyph {
  @Field(() => [GlyphwikiGlyph])
  async includes() {
    console.log(await includeGlyphData({ name: this.name, data: this.data }, Glyphwiki.getData));
    return await includeGlyphData({ name: this.name, data: this.data }, Glyphwiki.getData);
  }
}

@Resolver()
export class GlyphqikiResolver {
  @Query(() => GlyphwikiGlyph)
  glyphwiki(@Args() { name }: GetGlyphwikiArgs) {
    return Glyphwiki.getData(name);
  }
}
