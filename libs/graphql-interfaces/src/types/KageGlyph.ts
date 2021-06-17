import { Field, InterfaceType } from 'type-graphql';

@InterfaceType({ description: 'KAGEグリフ' })
export abstract class KageGlyph {
  @Field({ description: 'グリフ名' })
  abstract readonly name: string;

  @Field({ description: 'KAGEデータ' })
  abstract readonly data: string;
}
