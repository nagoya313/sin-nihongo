import DataLoader from 'dataloader';
import { groupBy } from 'underscore';
import { Args, FieldResolver, Int, Resolver, Root } from 'type-graphql';
import { Loader } from 'type-graphql-dataloader';
import { getRepository, In, Repository } from 'typeorm';
import { GetKanjisArgs, GetRadicalsArgs, PaginatedArgs } from '@sin-nihongo/graphql-interfaces';
import { Kanji } from '../entities/pg/Kanji';
import { Radical } from '../entities/pg/Radical';
import { RadicalConnection, RadicalKanjiConnection } from '../responses/Radica';
import { ConnectionResolver } from './ConnectionResolver';
import { NodeResolver } from './NodeResolver';

@Resolver(() => RadicalKanjiConnection)
export class RadicalKanjiConnectionResolver {
  @FieldResolver(() => Int)
  totalCount(@Root() { radicalId, args }: RadicalKanjiConnection) {
    return getRepository(Kanji, 'pg').count({ where: { ...args.whereQuery, radicalId } });
  }

  @FieldResolver(() => [Kanji])
  @Loader<RadicalKanjiConnection, [Kanji]>(async (queries) => {
    const ids = queries.map((q) => q.radicalId);
    const { args, paginated } = queries[0];
    const kanjis = await getRepository(Kanji, 'pg').find({
      where: { ...args.whereQuery, radicalId: In(ids) },
    });
    const kanjisByIds = groupBy(kanjis, 'radicalId');
    return ids.map((id) => kanjisByIds[id].slice(paginated.skip, paginated.skip + paginated.limit) ?? []) as any;
  })
  nodes(@Root() root: RadicalKanjiConnection) {
    return (dataloader: DataLoader<RadicalKanjiConnection, Radical>) => dataloader.load(root);
  }
}

@Resolver(() => RadicalConnection)
export class RadicalConnectionResolver extends ConnectionResolver(RadicalConnection, Radical) {}

@Resolver(() => Radical)
export class RadicalResolver extends NodeResolver(GetRadicalsArgs, RadicalConnection, Radical) {
  @FieldResolver(() => RadicalKanjiConnection, { description: '漢字' })
  kanjis(@Root() radical: Radical, @Args() args: GetKanjisArgs, @Args() paginated: PaginatedArgs) {
    return { radicalId: radical.id, args, paginated };
  }
}
