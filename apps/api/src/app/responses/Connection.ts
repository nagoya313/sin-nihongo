import { ClassType, Field, Int, ObjectType } from 'type-graphql';
import { PaginatedArgs, TypeOrmQueries } from '@sin-nihongo/graphql-interfaces';

export interface ConnectionBase {
  readonly args: TypeOrmQueries<unknown>;
  readonly paginated: PaginatedArgs;
}

export const Connection = <T>(T: ClassType<T>) => {
  @ObjectType({ isAbstract: true })
  abstract class ConnectionClass {
    @Field(() => [T])
    readonly nodes!: T[];

    @Field(() => Int)
    readonly totalCount!: number;

    readonly paginated!: PaginatedArgs;
  }
  return ConnectionClass;
};
