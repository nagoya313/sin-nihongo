import {
  Arg,
  Args,
  ClassType,
  Field,
  FieldResolver,
  Int,
  ObjectType,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from 'type-graphql';
import { getRepository, Repository } from 'typeorm';
import pluralize from 'pluralize';
import { Node, Radical as RadicalType, GetRadicalsArgs } from '@sin-nihongo/graphql-interfaces';
import { AbstractClassType } from '../libs/ClassType';

export const Connection = <T extends Node>(T: AbstractClassType<T>) => {
  @ObjectType({ isAbstract: true })
  abstract class ConnectionClass {
    @Field(() => [T])
    readonly nodes!: T[];

    @Field(() => Int)
    readonly totalCount!: number;
  }
  return ConnectionClass;
};

export const ConnectionResolver = <Args, Connection, Entity>(
  A: ClassType<Args>,
  C: ClassType<Connection>,
  E: AbstractClassType<Entity>
) => {
  @Resolver(() => C, { isAbstract: true })
  abstract class ConnectionResolverClass implements ResolverInterface<typeof C> {
    @Query(() => E, { nullable: true, name: E.name.toLowerCase() })
    async node(@Arg('id') id: string): Promise<Entity | undefined> {
      const decodedId = parseInt(
        Buffer.from(id, 'base64')
          .toString()
          .replace(new RegExp(`^${E.name}:`), '')
      );
      console.log(id, decodedId, E.name);
      return decodedId ? await this.repository.findOne(decodedId) : undefined;
    }

    @Query(() => C, { name: pluralize.plural(E.name.toLowerCase()) })
    connection(@Args(() => A) args: Args) {
      return { nodes: this.repository.find() };
    }

    @FieldResolver(() => Int)
    totalCount() {
      return this.repository.count();
    }

    @FieldResolver(() => [E])
    nodes() {
      return this.repository.find();
    }

    private repository: Repository<Entity> = getRepository(pluralize.plural(E.name.toLowerCase()), 'pg');
  }
  return ConnectionResolverClass;
};

@ObjectType()
export class RadicalConnection extends Connection(RadicalType) {}

@Resolver(() => RadicalConnection)
export class RadicalConnectionResolver extends ConnectionResolver(GetRadicalsArgs, RadicalConnection, RadicalType) {}
