import { Arg, Args, FieldResolver, ID, Query, Resolver, Root } from 'type-graphql';
import { GetRadicalsArgs, PaginatedArgs } from '@sin-nihongo/graphql-interfaces';
import { Kanji } from '../entities/Kanji';
import { Radical } from '../entities/Radical';
import { KanjiConnection } from '../responses/Kanji';
import { RadicalConnection } from '../responses/Radica';

@Resolver(() => Radical)
export class RadicalResolver {
  @Query(() => RadicalConnection, { description: '部首お取得する' })
  async radicals(@Args() args: GetRadicalsArgs, @Args() paginated: PaginatedArgs): Promise<Partial<RadicalConnection>> {
    const [radicals, count] = await Radical.findAndCount({ take: paginated.take, skip: paginated.skip });
    return { nodes: radicals, count };
  }

  @Query(() => Radical)
  async radical(@Arg('id', () => ID) id: number) {
    return Radical.findOne(id);
  }

  @FieldResolver(() => Radical)
  async kanjis(@Root() radical: Radical): Promise<Partial<KanjiConnection>> {
    const [kanjis, count] = await Kanji.findAndCount({ where: { radicalId: radical.id } });
    return { nodes: kanjis, count };
  }
}
