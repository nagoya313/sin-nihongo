import { Buffer } from 'buffer';
import { ClassType } from 'type-graphql';
import { getRepository, FindManyOptions, Raw } from 'typeorm';
import { CursorConnectionArgs, OrdarArgs, OrderDirection } from '@sin-nihongo/graphql-interfaces';
import { WHERE_QUERY_KEY } from '../decorators/WhereQuery';
import { AbstractClassType } from '../utils/ClassType';

type Args = CursorConnectionArgs & OrdarArgs;

export const QueryBuilder = (Entity: ClassType, Node: AbstractClassType, connectionName: string) => {
  class QueryBuilderClass {
    static EntityType = Entity;
    static NodeType = Node;
    static connectionName = connectionName;

    constructor(private repository = getRepository(Entity, connectionName)) {}

    count(args: Args) {
      return this.repository.count(this.countQuery(args));
    }

    find(args: Args) {
      return this.repository.find(this.findManyOptions(args));
    }

    private whereQuery(args: Args) {
      const queries: Record<string, unknown> = {};
      for (const key of Object.keys(args) as (keyof typeof args)[]) {
        const meta = Reflect.getMetadata(WHERE_QUERY_KEY, this, key as string);
        if (meta) {
          const queryKey = meta[1] || key;
          const queryValue = args[key];
          queries[queryKey] = meta[0] ? meta[0](queryValue) : queryValue;
        }
      }

      return queries;
    }

    private countQuery(args: CursorConnectionArgs & OrdarArgs) {
      const queries = { where: this.whereQuery(args) };

      if (args.field) {
        Object.assign(queries, { order: { [args.field]: args.direction ?? OrderDirection.ASC } });
      }

      return queries;
    }

    private findManyOptions(args: CursorConnectionArgs & OrdarArgs): FindManyOptions {
      const queries = this.countQuery(args);
      Object.assign(queries, { take: args.first });
      return queries;
    }
  }
  return QueryBuilderClass;
};

export const unnestLike = (value: unknown) =>
  Raw((alias) => `EXISTS(SELECT FROM unnest(${alias}) name WHERE name LIKE :name)`, { name: `${value}%` });

export const idDecoder = (id: string, entityName: string) => {
  const decode = Buffer.from(id, 'base64')
    .toString()
    .replace(new RegExp(`^${entityName}:`), '');

  switch (entityName) {
    case 'Radical':
    case 'Kanji':
      return parseInt(decode) || undefined;
  }

  return decode;
};
