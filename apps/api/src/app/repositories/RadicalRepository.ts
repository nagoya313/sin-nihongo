import { Radical } from '../entities/Radical';
import { RadicalsQueryParams } from '../forms/RadicalForm';
import { commonFindManyOption, makeWhereConditions, unnestLike } from '../libs/queryBuilder';

export class RadicalRepository {
  static findAndCount(params: RadicalsQueryParams) {
    const whereConditions = makeWhereConditions<Radical>();
    if (params.numberOfStrokes) {
      whereConditions.numberOfStrokes = params.numberOfStrokes;
    }
    if (params.nameLike) {
      whereConditions.names = unnestLike(params.nameLike);
    }

    return Radical.findAndCount({
      where: whereConditions,
      ...commonFindManyOption(params.page),
    });
  }
}
