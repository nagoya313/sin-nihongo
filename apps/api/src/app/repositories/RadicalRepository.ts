import { Raw } from 'typeorm';
import { GetRadicalsParams } from '@sin-nihongo/sin-nihongo-params';
import { Radical } from '../entities/Radical';
import { PaginationQueryParams } from '../params/PaginationQueryParams';
import { findManyOptions, undefinedSkipParams } from './EntityRepository';

export class RadicalRepository {
  static findAndCount(searchParams: GetRadicalsParams, pageParams: PaginationQueryParams) {
    return Radical.findAndCount(
      findManyOptions<Radical>(
        {
          numberOfStrokes: undefinedSkipParams(searchParams.numberOfStrokes),
          names: undefinedSkipParams(
            searchParams.nameLike,
            Raw((alias) => `EXISTS(SELECT FROM unnest(${alias}) name WHERE name LIKE :name)`, {
              name: `${searchParams.nameLike}%`,
            })
          ),
        },
        pageParams
      )
    );
  }
}
