import { ClassType, FieldResolver, Int, Resolver, Root } from 'type-graphql';
import { BaseEntity, FindManyOptions } from 'typeorm';
import { RadicalConnection } from '../responses/Radica';

type Entity<E extends BaseEntity> = {
  count: (options: FindManyOptions<E>) => Promise<number>;
  find: (options: FindManyOptions<E>) => Promise<E[]>;
};

export const ConnectionResolver = <T, R extends BaseEntity, U extends Entity<R>>(T: ClassType<T>, E: U) => {
  @Resolver(() => T, { isAbstract: true })
  abstract class ConnectionResolver {
    @FieldResolver(() => Int)
    async totalCount(@Root() { args, paginated }: RadicalConnection) {
      return E.count({ where: args.whereQuery, take: paginated.take, skip: paginated.skip });
    }

    @FieldResolver(() => [E])
    async nodes(@Root() { args, paginated }: RadicalConnection) {
      return E.find({ where: args.whereQuery, take: paginated.take, skip: paginated.skip });
    }
  }
  return ConnectionResolver;
};
