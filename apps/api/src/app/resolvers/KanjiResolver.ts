import { Args, Query, Resolver } from 'type-graphql';
import { GetKanjisArgs } from '@sin-nihongo/graphql-interfaces';
import { Kanji as KanjiResponse } from '../responses/Kanji';

@Resolver()
export class KanjiResolver {
  @Query(() => [KanjiResponse], { description: '部首お取得する' })
  async kanjis(@Args() args: GetKanjisArgs) {
    return [];
  }
}
