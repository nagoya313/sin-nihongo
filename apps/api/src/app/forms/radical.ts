import { FindManyOptions } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { RadicalsSearchParams } from '@sin-nihongo/api-interfaces';
import { PaginationQueryParams } from './pagination';
import { Radical } from '../entities/Radical';

export class RadicalsQueryParams extends PaginationQueryParams<RadicalsSearchParams> {
  constructor(params: RadicalsSearchParams) {
    super(params);
  }

  options(): FindManyOptions<Radical> {
    console.log(classToPlain(this.params));
    return {
      order: { id: 'ASC' },
      take: this.take,
      skip: this.skip,
    };
  }
  /*
  @CustomQueryExpose
  @Transform(
    ({ obj }) =>
      obj.nameLike &&
      Raw((alias) => `EXISTS(SELECT FROM unnest(${alias}) name WHERE name LIKE :name)`, {
        name: `${obj.nameLike}%`,
      })
  )
  names: typeof Raw;*/
}
