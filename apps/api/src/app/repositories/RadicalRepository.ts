import { createQueryBuilder } from 'typeorm';
import { Radical } from '../entities/Radical';
import { RadicalsQueryParams } from '../forms/RadicalForm';
import { queryBuilder, genericFindAndCount } from '../libs/queryBuilder';

export class RadicalRepository {
  static findAndCount(params: RadicalsQueryParams) {
    return genericFindAndCount(this.query(params), params.page);
  }

  private static baseQuery() {
    return createQueryBuilder(Radical, 'radicals');
  }

  private static query(params: RadicalsQueryParams) {
    return (params.hasQuery
      ? queryBuilder(this.baseQuery(), [
          { kind: 'OR', cond: 'number_of_strokes = :q1', parameters: { q1: params.integerQuery } },
          { kind: 'OR', cond: ':q2 = Any(names)', parameters: { q2: params.notIntegerQuery } },
        ])
      : this.baseQuery()
    ).orderBy('radicals.id');
  }
}
