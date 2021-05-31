import { IsInt, Min, IsOptional } from 'class-validator';
import { Pagination } from '@sin-nihongo/api-interfaces';

export class PaginationQueryParams {
  @Min(1)
  @IsInt({ message: 'ページ番号わ整数で入力してください。' })
  @IsOptional()
  page: number;
}

export const addPageData = <T>(data: T[], count: number, query: PaginationQueryParams): Pagination<T> => {
  return {
    items: data,
    meta: {
      totalItems: count,
      itemsPerPage: 20,
      itemCount: data.length,
      totalPages: Math.ceil(count / 20),
      currentPage: query.page || 1,
    },
  };
};
