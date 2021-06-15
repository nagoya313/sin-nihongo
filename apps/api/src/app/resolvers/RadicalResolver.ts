import * as DataLoader from 'dataloader';
import { groupBy } from 'underscore';
import { Arg, Args, ClassType, FieldResolver, ID, Int, Query, Resolver, Root } from 'type-graphql';
import { BaseEntity, FindManyOptions } from 'typeorm';
import { Loader } from 'type-graphql-dataloader';
import { GetKanjisArgs, GetRadicalsArgs, PaginatedArgs } from '@sin-nihongo/graphql-interfaces';
import { Kanji } from '../entities/Kanji';
import { Radical } from '../entities/Radical';
import { KanjiConnection } from '../responses/Kanji';
import { RadicalConnection } from '../responses/Radica';
import { ConnectionResolver } from './ConnectionResolver';

@Resolver(RadicalConnection)
export class RadicalConnectionResolver extends ConnectionResolver(RadicalConnection, Radical) {}

@Resolver(() => Radical)
export class RadicalResolver {
  @Query(() => RadicalConnection, { description: '部首おまとめて取得する' })
  radicals(@Args() args: GetRadicalsArgs, @Args() paginated: PaginatedArgs): Partial<RadicalConnection> {
    return { args, paginated };
  }

  @Query(() => Radical)
  async radical(@Arg('id', () => ID) id: number) {
    return Radical.findOne(id);
  }

  @FieldResolver(() => KanjiConnection)
  /*@Loader<number, KanjiConnection>(async (ids) => {
    // batchLoadFn
    const kanjis = await Kanji.findByIds([...ids]);
    const kanjisById = groupBy(kanjis, 'radicalId');
    return ids.map((id) => ({ nodes: kanjisById[id] ?? [], count: kanjis.length }));
  })*/
  async kanjis(@Root() radical: Radical, @Args() args: GetKanjisArgs, @Args() paginated: PaginatedArgs) {
    // readonlyであるべき
    args.radicalId = radical.id;
    return { args, paginated };
  }
}
