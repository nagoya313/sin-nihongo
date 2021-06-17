import { Field, Int, ObjectType } from 'type-graphql';
import { Character } from './Character';
import { Glyph } from './Glyph';
import { Node } from './Node';
import { TimeStamp } from './TimeStamp';
import { Radical } from './Radical';

@ObjectType({ implements: [Node, Character, TimeStamp], description: '漢字' })
export abstract class Kanji extends Character implements Node, TimeStamp {
  abstract readonly encodedId?: string;

  @Field({ description: '常用漢字' })
  abstract readonly regular: boolean;

  @Field({ description: '人名用漢字' })
  abstract readonly forName: boolean;

  @Field(() => Int, { description: '部首内画数' })
  abstract readonly numberOfStrokesInRadical: number;

  @Field(() => Radical, { description: '部首' })
  abstract readonly radical: Radical;

  @Field(() => Int, { description: 'JIS水準' })
  abstract readonly jisLevel: number;

  @Field(() => [String], { description: '訓読み' })
  abstract readonly onyomi: string[];

  @Field(() => [String], { description: '音読み' })
  abstract readonly kunyomi: string[];

  @Field(() => Glyph, { nullable: true, description: '実装グリフ' })
  readonly glyph?: Glyph;

  abstract readonly createdAt?: Date;
  abstract readonly updatedAt?: Date;
}
