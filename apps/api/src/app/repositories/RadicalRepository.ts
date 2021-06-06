import { Radical } from '../entities/Radical';
import { RadicalsQueryParams } from '@sin-nihongo/api-interfaces';
import { findAndCount, makeWhereConditions, permit, unnestLike } from '../libs/queryBuilder';

export class RadicalRepository {
  static findAndCount(params: RadicalsQueryParams) {
    const whereConditions = makeWhereConditions<Radical>(permit(params, ['numberOfStrokes']));
    if (params.nameLike) {
      whereConditions.names = unnestLike(params.nameLike);
    }

    return findAndCount(Radical, whereConditions, params.page);
  }
}
