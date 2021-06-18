import { ArgsType, Field, Int } from 'type-graphql';
import { Raw } from 'typeorm';
import * as Jf from 'joiful';
import { RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER } from '../lib/const';
import { CursorConnectionArgs } from './CursorConnectionArgs';
import { OrderableArgs } from './OrderArgs';
import { WhereQuery } from './TypeOrmQueries';

@ArgsType()
export class GetRadicalsArgs extends OrderableArgs(CursorConnectionArgs, 'id', 'numberOfStrokes') {
  @Field({ nullable: true, description: 'よみ' })
  @(Jf.string().optional().regex(RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER))
  @WhereQuery(
    (value) =>
      Raw((alias) => `EXISTS(SELECT FROM unnest(${alias}) name WHERE name LIKE :name)`, {
        name: `${value}%`,
      }),
    'names'
  )
  name?: string;

  @Field(() => Int, { nullable: true, description: '画数' })
  @(Jf.number().integer().optional().min(1))
  @WhereQuery()
  numberOfStrokes?: number;
}
