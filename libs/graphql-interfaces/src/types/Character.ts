import { Field, Int, InterfaceType } from 'type-graphql';

@InterfaceType({ description: '文字' })
export abstract class Character {
  @Field(() => Int, { description: 'コードポイント' })
  abstract readonly codePoint: number;

  @Field(() => Int, { description: '画数' })
  abstract readonly numberOfStrokes: number;

  @Field(() => String, { description: 'キャラクタ' })
  get character() {
    return String.fromCodePoint(this.codePoint);
  }
}
