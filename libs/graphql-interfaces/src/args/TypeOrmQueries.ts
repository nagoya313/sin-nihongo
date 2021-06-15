import 'reflect-metadata';
import { FindConditions } from 'typeorm';

const WHERE_QUERY_KEY = Symbol('where_query');

export const WhereQuery = (query?: (value: unknown) => unknown, name?: string): PropertyDecorator => (
  target,
  propertyKey
) => {
  Reflect.defineMetadata(WHERE_QUERY_KEY, [query, name], target, propertyKey);
};

export abstract class TypeOrmQueries<Args extends TypeOrmQueries<Args>> {
  get whereQuery(): FindConditions<unknown> {
    const queries: Record<string, unknown> = {};
    for (const key of Object.keys(this) as (keyof Args)[]) {
      const meta = Reflect.getMetadata(WHERE_QUERY_KEY, this, key as string);
      const queryKey = meta[1] || key;
      const queryValue = ((this as unknown) as Args)[key];
      queries[queryKey] = meta[0] ? meta[0](queryValue) : queryValue;
    }
    return queries;
  }
}
