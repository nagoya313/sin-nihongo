import {
  createQueryBuilder,
  BaseEntity,
  EntityTarget,
  ObjectLiteral,
  SelectQueryBuilder,
  FindConditions,
  FindManyOptions,
  Raw,
} from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import * as pluralize from 'pluralize';

export const makeWhereConditions = <Entity>(): FindConditions<Entity> => ({});

export const commonFindManyOption = (page: number): FindManyOptions => ({
  order: { id: 'ASC' },
  take: 20,
  skip: 20 * ((page || 1) - 1),
});

export const unnestLike = (like: string) =>
  Raw(
    (alias) => {
      return `EXISTS(SELECT FROM unnest(${alias}) name WHERE name LIKE :name)`;
    },
    { name: `${like}%` }
  );

interface WhereExpression {
  readonly where: string;
  readonly parameters: ObjectLiteral;
}

export const queryBuilder = <Entity>(target: EntityTarget<Entity>, params: WhereExpression[]) => {
  const tableName = pluralize(snakeCase(target.constructor.name));
  const base = createQueryBuilder(target, tableName);

  const query = params.reduce((accumulator, currentValue) => {
    if (Object.values(currentValue.parameters).some((v) => typeof v !== 'undefined')) {
      accumulator.andWhere(currentValue.where, currentValue.parameters);
    }
    return accumulator;
  }, base);

  return query.orderBy(`${tableName}.id`);
};

export const genericFindAndCount = async <T extends BaseEntity>(base: SelectQueryBuilder<T>, page: number) =>
  base
    .take(20)
    .skip(20 * ((page || 1) - 1))
    .getManyAndCount();
