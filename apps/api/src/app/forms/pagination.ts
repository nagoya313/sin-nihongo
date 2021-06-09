import { PaginationParams } from '@sin-nihongo/api-interfaces';

export class PaginationQueryParams<Params extends PaginationParams> {
  constructor(protected params: Params) {}

  get itemsPerPage() {
    return this.take;
  }

  get currentPage() {
    return this.params.page || 1;
  }

  get skip() {
    return this.take * (this.currentPage - 1);
  }

  get take() {
    return this.params.limit || 20;
  }
}
