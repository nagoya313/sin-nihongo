import 'reflect-metadata';
import DataLoader from 'dataloader';
import { Arg, Args, Authorized, ClassType, FieldResolver, Int, Query, Resolver, Root } from 'type-graphql';
import { Loader } from 'type-graphql-dataloader';
import { getRepository } from 'typeorm';
import pluralize from 'pluralize';
import { Connection } from '@sin-nihongo/graphql-interfaces';
import { AbstractClassType } from '../libs/ClassType';
import { idDecoder } from '../services/QueryBuilder';

type LoaderResult<T> = T | null;
type QueryBuilderType = ClassType & { EntityType: ClassType; NodeType: AbstractClassType; connectionName: string };

export const ConnectionResolver = <C extends Connection, E extends QueryBuilderType>(C: C, E: E) => {
  const c = new C();
  type ArgsType = InstanceType<typeof c.argsType>;
  const nodeName = E.NodeType.name.toLowerCase();
  const entityName = E.EntityType.name;

  @Resolver(() => C, { isAbstract: true })
  abstract class ConnectionResolverClass {
    @Query(() => c.type, { nullable: true, name: nodeName })
    @Loader<string, LoaderResult<E>>(async (ids) => {
      const decodedIds = ids.map((id) => idDecoder(id, entityName)).filter((id) => typeof id !== 'undefined');
      const entities = await getRepository(E.EntityType, E.connectionName).findByIds(decodedIds);
      return ids.map((id) => entities.find((e) => e.encodedId === id) ?? null);
    })
    node(@Arg('id') id: string) {
      return (dataloader: DataLoader<string, LoaderResult<E>>) => dataloader.load(id);
    }

    @Query(() => C, { name: pluralize.plural(nodeName) })
    connection(@Args(() => c.argsType) args: ArgsType) {
      console.log(args);
      return args;
    }

    @FieldResolver(() => Int)
    totalCount(@Root() root: ArgsType) {
      return this.repository.count(root);
    }

    @FieldResolver(() => [c.type])
    nodes(@Root() root: ArgsType) {
      return this.repository.find(root);
    }

    private repository = new E();
  }
  return ConnectionResolverClass;
};
