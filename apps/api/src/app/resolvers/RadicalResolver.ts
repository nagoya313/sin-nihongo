import { Args, Query, Resolver } from 'type-graphql';
import { GetRadicalsArgs } from '@sin-nihongo/graphql-interfaces';
import { Radical as RadicalEntity } from '../entities/Radical';
import { Radical as RadicalReponse } from '../responses/Radica';

@Resolver()
export class RadicalResolver {
  @Query(() => [RadicalReponse], { description: '部首お取得する' })
  async radicals(@Args() args: GetRadicalsArgs) {
    return [];
  }
}
