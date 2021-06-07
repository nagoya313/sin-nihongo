import { BaseEntity } from 'typeorm';
import { PaginationQueryParams } from '@sin-nihongo/api-interfaces';
import { addPageData } from '../libs/pagination';

export abstract class EntityResponse<T extends BaseEntity, R, Q extends PaginationQueryParams = PaginationQueryParams> {
  abstract toResponse(radical: T, query?: Q): R;

  toIndexResponse(entitiesAndCount: [T[], number], query: Q) {
    const [entities, count] = entitiesAndCount;
    const items = entities.map((d) => this.toResponse(d, query));
    return addPageData<R>(items, count, query);
  }
}
