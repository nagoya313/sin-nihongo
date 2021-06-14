import { Args, Query, Resolver } from 'type-graphql';
import { GetRadicalsArgs, PaginatedArgs } from '@sin-nihongo/graphql-interfaces';
import { Radical } from '../entities/Radical';
import { PaginatedRadical } from '../responses/Radica';

@Resolver()
export class RadicalResolver {
  @Query(() => PaginatedRadical, { description: '部首お取得する' })
  async radicals(@Args() args: GetRadicalsArgs, @Args() paginated: PaginatedArgs): Promise<Partial<PaginatedRadical>> {
    const [radicals, count] = await Radical.findAndCount({ take: paginated.take, skip: paginated.skip });
    return { items: radicals, count, paginated };
  }
}
