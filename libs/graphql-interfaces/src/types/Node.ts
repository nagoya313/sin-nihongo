import { Field, ID, InterfaceType } from 'type-graphql';

@InterfaceType({ description: 'ノード' })
export abstract class Node {
  @Field(() => ID, { name: 'id', description: 'ID' })
  abstract readonly encodedId?: string;
}
