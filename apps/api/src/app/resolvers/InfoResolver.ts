import { Query, Resolver } from 'type-graphql';
import { Info } from '@sin-nihongo/graphql-interfaces';
import { Glyphwiki } from '../services/Glyphwiki';

@Resolver()
export class InfoResolver {
  @Query(() => Info, { description: 'サイト情報お取得する' })
  async info() {
    return { glyphwikiAccessible: await Glyphwiki.health() } as Info;
  }
}
