import { ArgsType, Field, Int } from 'type-graphql';
import * as Jf from 'joiful';
import { RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER } from './const';
import { CursorConnectableArgs } from './CursorConnectionArgs';
import { OrderableArgs } from './OrderArgs';

@ArgsType()
export class GetRadicalsArgsClass {
  @Field({ nullable: true, description: 'よみ' })
  @(Jf.string().optional().regex(RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER))
  name?: string;

  @Field(() => Int, { nullable: true, description: '画数' })
  @(Jf.number().integer().optional().min(1))
  numberOfStrokes?: number;
}

export const GetRadicalsArgs = OrderableArgs(
  CursorConnectableArgs(GetRadicalsArgsClass),
  'id',
  'numberOfStrokes',
  'name'
);

export type GetRadicalsArgs = typeof GetRadicalsArgs;
