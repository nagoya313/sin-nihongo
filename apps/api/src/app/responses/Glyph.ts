import { Field, ID, InterfaceType, ObjectType } from 'type-graphql';

@InterfaceType({ description: '抽象グリフ' })
abstract class IGlyph {
  @Field({ description: 'グリフ名' })
  readonly name!: string;

  @Field({ description: 'KAGEデータ' })
  readonly data!: string;
}

@ObjectType({ implements: IGlyph, description: 'グリフ' })
export class Glyph extends IGlyph {
  @Field(() => ID, { description: 'ID' })
  readonly id!: string;

  @Field({ description: '作成日時' })
  readonly createdAt!: Date;

  @Field({ description: '更新日時' })
  readonly updatedAt!: Date;

  @Field(() => [Glyph], { description: '含むグリフ' })
  readonly includes!: Glyph[];
}

@ObjectType({ implements: IGlyph, description: 'グリフウィキから取得したグリフ' })
export class GlyphwikiGlyph extends IGlyph {
  @Field(() => [Glyph], { description: '含むグリフ' })
  readonly includes!: Glyph[];
}
