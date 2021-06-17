import { Field, ObjectType } from 'type-graphql';
import { Character } from './Character';
import { Node } from './Node';
import { TimeStamp } from './TimeStamp';

@ObjectType({ implements: [Node, Character, TimeStamp], description: '部首' })
export abstract class Radical extends Character implements Node, TimeStamp {
  abstract readonly encodedId?: string;

  @Field(() => [String], { description: '名称' })
  abstract names: string[];

  abstract readonly createdAt?: Date;
  abstract readonly updatedAt?: Date;
}
