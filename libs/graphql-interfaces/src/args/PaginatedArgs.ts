import { ArgsType, Field, Int } from 'type-graphql';
import * as Jf from 'joiful';

@ArgsType()
export class PaginatedArgs {
  @Field(() => Int, { description: 'ページ番号' })
  @(Jf.number().integer().required().min(1))
  readonly page!: number;

  @Field(() => Int, { description: '取得件数' })
  @(Jf.number().integer().required().min(1).max(200))
  readonly limit!: number;

  get skip() {
    return this.limit * (this.page - 1);
  }
}
