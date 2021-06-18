import { ClassType, Field, Int, ObjectType } from 'type-graphql';
import { CursorConnectionArgs, Node } from '@sin-nihongo/graphql-interfaces';
import { AbstractClassType } from '../libs/ClassType';

export const Connection = <N extends Node, A extends CursorConnectionArgs, E extends N>(
  N: AbstractClassType<N>,
  A: ClassType<A>,
  E: ClassType<E>
) => {
  @ObjectType({ isAbstract: true })
  abstract class ConnectionClass {
    @Field(() => [N])
    readonly nodes!: N[];

    @Field(() => Int)
    readonly totalCount!: number;

    readonly args!: A;

    static readonly ArgsType = A;
    static readonly Type = N;
    static readonly EntityType = E;
  }
  return ConnectionClass;
};

export type Connection = ReturnType<typeof Connection>;
