import { Radical } from '../entities/Radical';
import { RadicalsQueryParams } from '../forms/RadicalForm';
import { queryBuilder, genericFindAndCount } from '../libs/queryBuilder';

export class RadicalRepository {
  static findAndCount(params: RadicalsQueryParams) {
    return genericFindAndCount(this.query(params), params.page);
  }

  private static query(params: RadicalsQueryParams) {
    return queryBuilder(Radical, [
      {
        where: 'EXISTS(SELECT FROM unnest(names) name WHERE name LIKE :q1)',
        parameters: { q1: params.nameLike && `${params.nameLike}%` },
      },
      {
        where: 'number_of_strokes = :q2',
        parameters: { q2: params.numberOfStrokes },
      },
    ]);
  }
}
