import { BaseEntity } from 'typeorm';
import { PaginationResponse } from '@sin-nihongo/api-interfaces';
import { PaginationQueryParams } from '../params/PaginationQueryParams';

export abstract class EntityResponse<Entity extends BaseEntity, Response> {
  abstract toResponse(entity: Entity): Response;

  async toIndexResponse(
    entitiesAndCount: Promise<[Entity[], number]>,
    pageParams: PaginationQueryParams
  ): Promise<PaginationResponse<Response>> {
    const [entities, count] = await entitiesAndCount;
    const items = entities.map((d) => this.toResponse(d));
    return {
      items: items,
      meta: {
        totalItems: count,
        itemsPerPage: pageParams.take,
        itemCount: items.length,
        totalPages: Math.ceil(count / pageParams.take),
        currentPage: pageParams.currentPage,
      },
    };
  }
}
