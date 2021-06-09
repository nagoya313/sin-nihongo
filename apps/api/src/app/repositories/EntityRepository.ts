import { classToClass, classToPlain } from 'class-transformer';
import { FindManyOptions, BaseEntity } from 'typeorm';

export const entityFindOptions = <Entity extends BaseEntity, SearchParams, PageParams>(
  search: SearchParams,
  page: PageParams
): FindManyOptions<Entity> => {
  console.log(search);
  const where = classToClass(search, { groups: ['where'], exposeUnsetFields: false });
  console.log(where);

  console.log(page);
  const pagination = classToPlain(page, { excludeExtraneousValues: true, groups: ['pagination'] });
  console.log(pagination);

  return {
    where: where,
    order: { id: 'ASC' },
    ...pagination,
  };
};
