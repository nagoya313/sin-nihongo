import { ClassType, Field, Int, ObjectType } from 'type-graphql';
import { PaginatedArgs } from '@sin-nihongo/graphql-interfaces';

export const Paginated = <T>(T: ClassType<T>) => {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    readonly count!: number;
    readonly paginated!: PaginatedArgs;

    @Field(() => [T])
    readonly nodes!: T[];

    @Field(() => Int)
    get totalCount() {
      return this.count;
    }

    @Field(() => Int)
    get itemsPerPage() {
      return this.paginated.limit;
    }

    @Field(() => Int)
    get itemCount() {
      return this.nodes.length;
    }

    @Field(() => Int)
    get totalPages() {
      return Math.ceil(this.count / this.paginated.limit);
    }

    @Field(() => Int)
    get currentPage() {
      return this.paginated.page;
    }
  }
  return PaginatedResponseClass;
};
