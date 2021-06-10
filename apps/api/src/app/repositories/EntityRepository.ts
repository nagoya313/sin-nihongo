import { FindConditions, FindOperator, FindManyOptions, Raw } from 'typeorm';
import { PaginationQueryParams } from '../params/PaginationQueryParams';

export const undefinedSkipParams = <V>(value: V, raw: V | FindOperator<V> = value) => {
  return typeof value === 'undefined' ? Raw<V>(() => '1 = 1') : raw;
};

export const findManyOptions = <Entity>(
  where: FindConditions<Entity>,
  pageParams: PaginationQueryParams
): FindManyOptions<Entity> => {
  return {
    where: where,
    /*order: {
      id: 'ASC',
    },*/
    ...pageParams.pageParams,
  };
};
