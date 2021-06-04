import { Raw } from 'typeorm';
import { Radical } from '../entities/Radical';
import { RadicalsQueryParams } from '../forms/RadicalForm';
import { commonFindManyOption, makeWhereConditions } from '../libs/queryBuilder';

export class RadicalRepository {
  static findAndCount(params: RadicalsQueryParams) {
    const whereConditions = makeWhereConditions<Radical>();
    if (params.numberOfStrokes) {
      whereConditions.numberOfStrokes = params.numberOfStrokes;
    }
    if (params.nameLike) {
      whereConditions.names = Raw(
        (alias) => {
          return `EXISTS(SELECT FROM unnest(${alias}) name WHERE name LIKE :name)`;
        },
        { name: `${params.nameLike}%` }
      );
    }

    return Radical.findAndCount({
      where: whereConditions,
      ...commonFindManyOption(params.page),
    });
  }
}
