import { ArgsType } from 'type-graphql';
import { Raw } from 'typeorm';
import { RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER } from '../lib/const';
import { IntOptionalField, StringOptionalField } from '../lib/decorator';
import { TypeOrmQueries, WhereQuery } from './TypeOrmQueries';

@ArgsType()
export class GetRadicalsArgs extends TypeOrmQueries<GetRadicalsArgs> {
  @StringOptionalField({ name: 'よみ', validations: { match: RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER } })
  @WhereQuery(
    (value) =>
      Raw((alias) => `EXISTS(SELECT FROM unnest(${alias}) name WHERE name LIKE :name)`, {
        name: `${value}%`,
      }),
    'names'
  )
  name?: string;

  @IntOptionalField({ name: '画数', validations: { min: 1 } })
  @WhereQuery()
  numberOfStrokes?: number;
}
