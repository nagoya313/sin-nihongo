import { Arg, Args, ClassType, ID, Query, Resolver } from 'type-graphql';
import { getRepository, Repository } from 'typeorm';
import pluralize from 'pluralize';
import { PaginatedArgs, TypeOrmQueries } from '@sin-nihongo/graphql-interfaces';
import { ConnectionBase } from '../responses/Connection';

export const NodeResolver = <Args extends TypeOrmQueries<unknown>, Connection extends ConnectionBase, Entity>(
  A: ClassType<Args>,
  C: ClassType<Connection>,
  E: ClassType<Entity>
) => {
  @Resolver(() => E, { isAbstract: true })
  abstract class NodeResolver {
    @Query(() => C, { name: pluralize.plural(E.name.toLowerCase()) })
    connection(@Args(() => A) args: Args, @Args() paginated: PaginatedArgs) {
      return { args, paginated };
    }

    @Query(() => E, { name: E.name.toLowerCase() })
    async node(@Arg('id', () => ID) id: number) {
      return this.repository.findOne(id);
    }

    private repository: Repository<Entity> = getRepository(E, 'pg');
  }
  return NodeResolver;
};
