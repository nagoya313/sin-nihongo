import { Args, Query, Resolver } from 'type-graphql';
import { GetKanjisArgs } from '@sin-nihongo/graphql-interfaces';
import { Kanji } from '../entities/Kanji';
import { KanjiConnection } from '../responses/Kanji';
import { ConnectionResolver } from './ConnectionResolver';

@Resolver(() => KanjiConnection)
export class KanjiConnectionResolver extends ConnectionResolver(KanjiConnection, Kanji) {}

@Resolver()
export class KanjiResolver {
  @Query(() => [KanjiConnection], { description: '部首お取得する' })
  async kanjis(@Args() args: GetKanjisArgs) {
    return [];
  }
}
