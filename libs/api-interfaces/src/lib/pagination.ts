import { IsInt, Min } from 'class-validator';
import { IsOptional } from './decorator';

interface PaginationMetaData {
  readonly totalItems: number;
  readonly itemsPerPage: number;
  readonly itemCount: number;
  readonly totalPages: number;
  readonly currentPage: number;
}

export interface Pagination<T> {
  readonly items: T[];
  readonly meta: PaginationMetaData;
}

export class PaginationQueryParams {
  @IsOptional()
  @Min(1, { message: 'ページ番号わ$constraint1以上で入力してください。' })
  @IsInt({ message: 'ページ番号わ整数で入力してください。' })
  page?: number;
}
