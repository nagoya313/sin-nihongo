import { BaseEntity, SelectQueryBuilder } from 'typeorm';

export const genericFindAndCount = async <T extends BaseEntity>(base: SelectQueryBuilder<T>, page: number) =>
  base
    .take(20)
    .skip(20 * ((page || 1) - 1))
    .getManyAndCount();
