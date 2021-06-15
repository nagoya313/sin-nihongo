import { Args, Query, Resolver } from 'type-graphql';
import { GetKanjisArgs } from '@sin-nihongo/graphql-interfaces';
import { KanjiConnection } from '../responses/Kanji';

@Resolver()
export class KanjiResolver {
  @Query(() => [KanjiConnection], { description: '部首お取得する' })
  async kanjis(@Args() args: GetKanjisArgs) {
    return [];
  }
}
