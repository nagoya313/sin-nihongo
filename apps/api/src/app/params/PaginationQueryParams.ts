import { PaginationParams } from '@sin-nihongo/sin-nihongo-params';

export class PaginationQueryParams extends PaginationParams {
  get currentPage() {
    return this.page || 1;
  }

  get skip() {
    return this.take * (this.currentPage - 1);
  }

  get take() {
    return this.limit || 20;
  }

  get pageParams() {
    return { skip: this.skip, take: this.take };
  }
}
