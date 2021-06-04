import { FindConditions, FindManyOptions, Raw, BaseEntity } from 'typeorm';
import { intersection } from 'underscore';

const commonFindManyOption = (page: number): FindManyOptions => ({
  order: { id: 'ASC' },
  take: 20,
  skip: 20 * ((page || 1) - 1),
});

export const makeWhereConditions = <Entity>(params: FindConditions<Entity> = {}) => params;

export const unnestLike = (like: string) =>
  Raw(
    (alias) => {
      return `EXISTS(SELECT FROM unnest(${alias}) name WHERE name LIKE :name)`;
    },
    { name: `${like}%` }
  );

type ParamsKey<Params> = keyof Params & string;

export const permit = <Params>(params: Params, permit: ParamsKey<Params>[]) => {
  const permitParams = {};
  intersection(Object.keys(params), permit).forEach((key) => {
    if (typeof params[key] !== 'undefined') {
      permitParams[key] = params[key];
    }
  });
  return permitParams;
};

export const findAndCount = <Entity extends BaseEntity>(
  entityClass: any,
  whereConditions: FindConditions<Entity>,
  page: number
) =>
  entityClass.findAndCount({
    where: whereConditions,
    ...commonFindManyOption(page),
  });
