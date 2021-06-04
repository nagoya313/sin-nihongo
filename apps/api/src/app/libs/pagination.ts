import { IsInt, Min, IsOptional } from 'class-validator';
import { Pagination } from '@sin-nihongo/api-interfaces';

export class PaginationQueryParams {
  @IsOptional()
  @Min(1, { message: 'ページ番号わ$constraint1以上で入力してください。' })
  @IsInt({ message: 'ページ番号わ整数で入力してください。' })
  page?: number;
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
