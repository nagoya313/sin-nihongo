import { Field, InterfaceType, ObjectType } from 'type-graphql';

@InterfaceType({ description: '抽象グリフ' })
export abstract class IGlyph {
  @Field({ description: 'グリフ名' })
  readonly name!: string;

  @Field({ description: 'KAGEデータ' })
  readonly data!: string;
}

@ObjectType({ implements: IGlyph, description: 'グリフウィキから取得したグリフ' })
export class GlyphwikiGlyph extends IGlyph {
  @Field(() => [IGlyph], { description: '含むグリフ' })
  readonly includes!: IGlyph[];
}
