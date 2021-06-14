import { Query, Resolver } from 'type-graphql';
import { Info } from '../responses/Info';
import { Glyphwiki } from '../services/Glyphwiki';

@Resolver()
export class InfoResolver {
  @Query(() => Info, { description: 'サイト情報お取得する' })
  async info(): Promise<Info> {
    return {
      glyphwikiAccessible: await Glyphwiki.health(),
    };
  }
}
