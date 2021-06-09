import { IsInt, IsOptional, Max, Min } from 'class-validator';

interface PaginationMetaData {
  readonly totalItems: number;
  readonly itemsPerPage: number;
  readonly itemCount: number;
  readonly totalPages: number;
  readonly currentPage: number;
}

export class Pagination<T> {
  constructor(items: T[], count: number, query: PaginationQueryParams) {
    this.items = items;
    this.meta = {
      totalItems: count,
      itemsPerPage: query.itemsPerPage,
      itemCount: items.length,
      totalPages: Math.ceil(count / query.itemsPerPage),
      currentPage: query.currentPage,
    };
  }

  readonly items: T[];
  readonly meta: PaginationMetaData;
}

export class PaginationParams {
  @IsOptional()
  @Min(1, { message: 'ページ番号わ$constraint1以上で入力してください' })
  @IsInt({ message: 'ページ番号わ整数で入力してください' })
  page?: number;

  @IsOptional()
  @Min(1, { message: 'ページ番号わ$constraint1以上で入力してください' })
  @Max(200, { message: 'ページ番号わ$constraint1以下で入力してください' })
  @IsInt({ message: 'ページ番号わ整数で入力してください' })
  limit?: number;
}
