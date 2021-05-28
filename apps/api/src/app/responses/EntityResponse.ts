import { BaseEntity } from 'typeorm';
import { addPageData, PaginationQueryParams } from '../libs/pagination';

export abstract class EntityResponse<T extends BaseEntity, R, Q extends PaginationQueryParams = PaginationQueryParams> {
  abstract toResponse(radical: T, query?: Q): R;

  toIndexResponse(entitiesAndCount: [T[], number], query: Q) {
    const [entities, count] = entitiesAndCount;
    const data = entities.map((d) => this.toResponse(d, query));
    return addPageData<R>(data, count, query);
  }
}
