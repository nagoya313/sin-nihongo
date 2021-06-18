import DataLoader from 'dataloader';
import { Arg, Args, FieldResolver, Int, Query, Resolver } from 'type-graphql';
import { Loader } from 'type-graphql-dataloader';
import { getRepository } from 'typeorm';
import pluralize from 'pluralize';
import { Connection } from './Connection';
import { idDecoder } from './IdDecoder';

export const ConnectionResolver = <Con extends Connection>(C: Con, connectionName: string) => {
  type ArgsType = InstanceType<typeof C.ArgsType>;
  type Type = InstanceType<typeof C.Type>;
  type EntityType = InstanceType<typeof C.EntityType>;
  const entityName = C.EntityType.name;

  @Resolver(() => C, { isAbstract: true })
  abstract class ConnectionResolverClass {
    @Query(() => C.Type, { nullable: true, name: entityName.toLowerCase() })
    @Loader<string, EntityType | undefined>(async (ids) => {
      const decodedIds = ids.map((id) => idDecoder(id, entityName));
      const entities = await getRepository(C.EntityType, connectionName).findByIds(decodedIds);
      return ids.map((id) => entities.find((e) => e.encodedId === id));
    })
    node(@Arg('id') id: string) {
      return (dataloader: DataLoader<string, EntityType | undefined>) => dataloader.load(id);
    }

    @Query(() => C, { name: pluralize.plural(C.EntityType.name.toLowerCase()) })
    connection(@Args(() => C.ArgsType) args: ArgsType) {
      return { nodes: this.repository.find({ take: args.first }) };
    }

    @FieldResolver(() => Int)
    totalCount() {
      return this.repository.count();
    }

    @FieldResolver(() => [C.Type])
    nodes() {
      return this.repository.find();
    }

    private repository = getRepository(C.EntityType, connectionName);
  }
  return ConnectionResolverClass;
};
