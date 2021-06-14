import { Field, ObjectType, Query, Resolver } from 'type-graphql';
import { Glyphwiki } from '../services/Glyphwiki';

@ObjectType()
export class Info {
  @Field()
  glyphwikiAccessible!: boolean;
}

@Resolver()
export class InfoResolver {
  @Query(() => Info)
  async info(): Promise<Info> {
    return {
      glyphwikiAccessible: await Glyphwiki.health(),
    };
  }
}
