import { createQueryBuilder } from 'typeorm';
import { Radical } from '../entities/Radical';
import { RadicalsQueryParams } from '../forms/RadicalForm';
import { genericFindAndCount } from '../libs/queryBuilder';

export class RadicalRepository {
  static findAndCount(params: RadicalsQueryParams) {
    return genericFindAndCount(this.query(params), params.page);
  }

  private static query(params: RadicalsQueryParams) {
    let base = createQueryBuilder(Radical, 'radicals');

    if (params.nameLike) {
      base = base.andWhere('EXISTS(SELECT FROM unnest(names) name WHERE name LIKE :q1)', { q1: `${params.nameLike}%` });
    }
    if (params.numberOfStrokes) {
      base = base.andWhere('number_of_strokes = :q2', { q2: params.numberOfStrokes });
    }

    return base.orderBy('radicals.id');
  }
}
