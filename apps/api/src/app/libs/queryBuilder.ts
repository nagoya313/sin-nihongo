import { BaseEntity, ObjectLiteral, SelectQueryBuilder, Brackets, WhereExpression } from 'typeorm';

type WhereKind = 'AND' | 'OR';
export type QueryType =
  | { kind: WhereKind; cond: string; parameters: ObjectLiteral }
  | { kind: WhereKind; qb: QueryType[] };
type ExpressionType<T extends BaseEntity> = SelectQueryBuilder<T> | WhereExpression;

export const emptyQuery: QueryType = { kind: 'AND', cond: '', parameters: { empty: undefined } };

const isEmptyQuery = (query: QueryType): boolean => {
  if ('parameters' in query) {
    return typeof Object.values(query.parameters)[0] === 'undefined';
  } else if ('qb' in query) {
    return queryFilter(query.qb).length === 0;
  }
  return true;
};

const queryFilter = (queries: QueryType[]) => queries.filter((query) => !isEmptyQuery(query));

const querySwithFirst = <E extends ExpressionType<T>, T extends BaseEntity>(
  base: ExpressionType<T>,
  queries: QueryType[]
): E => {
  const filteredQuery = queryFilter(queries);
  if (filteredQuery.length === 0) {
    return base as E;
  }
  if ('parameters' in filteredQuery[0]) {
    base = base.where(filteredQuery[0].cond, filteredQuery[0].parameters);
    for (const q of filteredQuery.slice(1)) {
      base = querySwithSecond(base, q);
    }
  } else if ('qb' in filteredQuery[0]) {
    const filteredQb = queryFilter(filteredQuery[0].qb);
    if (filteredQb.length !== 0) {
      base = base.where(
        new Brackets((qb) => {
          querySwithFirst(qb, filteredQb);
        })
      );
      for (const q of filteredQuery.slice(1)) {
        base = querySwithSecond(base, q);
      }
    }
  }
  return base as E;
};

const querySwithSecond = <E extends ExpressionType<T>, T extends BaseEntity>(
  base: ExpressionType<T>,
  query: QueryType
): E => {
  if ('parameters' in query) {
    if (query.kind === 'AND') {
      base = base.andWhere(query.cond, query.parameters);
    } else {
      base = base.orWhere(query.cond, query.parameters);
    }
  } else if ('qb' in query) {
    if (query.kind === 'AND') {
      base = base.andWhere(
        new Brackets((qb) => {
          querySwithFirst(qb, query.qb);
        })
      );
    } else {
      base = base.orWhere(
        new Brackets((qb) => {
          querySwithFirst(qb, query.qb);
        })
      );
    }
  }
  return base as E;
};

export const queryBuilder = <T extends BaseEntity>(
  base: SelectQueryBuilder<T>,
  queries: QueryType[]
): SelectQueryBuilder<T> => {
  if (queries.length === 0) {
    return base;
  }

  return querySwithFirst(base, queries);
};

export const genericFindAndCount = async <T extends BaseEntity>(base: SelectQueryBuilder<T>, page: number) =>
  base
    .take(20)
    .skip(20 * ((page || 1) - 1))
    .getManyAndCount();
