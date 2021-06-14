import { ClassType, Field, Int, ObjectType } from 'type-graphql';
import { PaginatedArgs } from '@sin-nihongo/graphql-interfaces';

export const Paginated = <T>(T: ClassType<T>) => {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    readonly count!: number;
    readonly paginated!: PaginatedArgs;

    @Field(() => [T])
    readonly items!: T[];

    @Field(() => Int)
    get totalItems() {
      return this.count;
    }

    @Field(() => Int)
    get itemsPerPage() {
      return this.paginated.take;
    }

    @Field(() => Int)
    get itemCount() {
      return this.items.length;
    }

    @Field(() => Int)
    get totalPages() {
      return Math.ceil(this.count / this.paginated.take);
    }

    @Field(() => Int)
    get currentPage() {
      return this.paginated.currentPage;
    }
  }
  return PaginatedResponseClass;
};
