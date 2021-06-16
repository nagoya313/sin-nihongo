import { ClassType, FieldResolver, Int, Resolver, Root } from 'type-graphql';
import { getRepository, Repository } from 'typeorm';
import { ConnectionBase } from '../responses/Connection';

export const ConnectionResolver = <Connection extends ConnectionBase, Entity>(
  C: ClassType<Connection>,
  E: ClassType<Entity>
) => {
  @Resolver(() => C, { isAbstract: true })
  abstract class ConnectionResolverClass {
    @FieldResolver(() => Int)
    totalCount(@Root() { args, paginated }: Connection) {
      return this.repository.count({ where: args.whereQuery, take: paginated.limit, skip: paginated.skip });
    }

    @FieldResolver(() => [E])
    nodes(@Root() { args, paginated }: Connection) {
      return this.repository.find({ where: args.whereQuery, take: paginated.limit, skip: paginated.skip });
    }

    private repository: Repository<Entity> = getRepository(E, 'pg');
  }
  return ConnectionResolverClass;
};
