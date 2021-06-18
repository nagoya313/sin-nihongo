import { ClassType, Field, Int, ObjectType } from 'type-graphql';
import { CursorConnectionArgs } from '../args/CursorConnectionArgs';
import { OrdarArgs } from '../args/OrderArgs';

type NodeType<T> = abstract new () => T;

export const Connection = <N>(N: NodeType<N>) => {
  @ObjectType({ isAbstract: true })
  abstract class ConnectionClass {
    @Field(() => [N])
    readonly nodes!: N[];

    @Field(() => Int)
    readonly totalCount!: number;

    readonly argsType!: ClassType<CursorConnectionArgs & OrdarArgs>;
    readonly type = N;
    readonly args: unknown;
  }
  return ConnectionClass as (new () => { [key in keyof ConnectionClass]: ConnectionClass[key] });
};

export type Connection = ReturnType<typeof Connection>;