import { ArgsType } from 'type-graphql';
import { IntField } from '../lib/decorator';

@ArgsType()
export class PaginatedArgs {
  @IntField({ name: 'ページ番号', optional: true, validations: { min: 1 } })
  readonly page?: number;

  @IntField({ name: '取得件数', optional: true, validations: { min: 1, max: 200 } })
  readonly limit?: number;

  get currentPage() {
    return this.page || 1;
  }

  get skip() {
    return this.take * (this.currentPage - 1);
  }

  get take() {
    return this.limit || 20;
  }
}
