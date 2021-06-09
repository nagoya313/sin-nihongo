import { classToClass, classToPlain, Expose } from 'class-transformer';
import { BaseEntity } from 'typeorm';
import { Pagination, PaginationQueryParams } from '@sin-nihongo/api-interfaces';
import { addPageData } from '../libs/pagination';
import { findAndCount } from '../libs/queryBuilder';
import { EntityRepository } from '../repositories/EntityRepository';

export abstract class EntityResponse<T extends BaseEntity, R> {
  abstract toResponse(radical: T): R;

  async toIndexResponse<Params>(entitiesType: any, params: Params) {
    const [entities, count] = await EntityRepository.findAndCount(entitiesType, params);
    const items = entities.map((d) => this.toResponse(d));
    return new Pagination(items, count, params);
  }
}
