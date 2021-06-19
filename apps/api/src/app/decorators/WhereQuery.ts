export const WHERE_QUERY_KEY = Symbol('sin_nihongo:where_query');

type WhereQuertType = (query?: (value: unknown) => unknown, name?: string) => PropertyDecorator;

export const WhereQuery: WhereQuertType = (query?, name?): PropertyDecorator => (target, propertyKey) => {
  Reflect.defineMetadata(WHERE_QUERY_KEY, [query, name], target, propertyKey);
};
