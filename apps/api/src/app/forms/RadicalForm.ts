import { IsInt, Min, IsOptional, Matches } from 'class-validator';
import { RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER } from '@sin-nihongo/api-interfaces';
import { PaginationQueryParams } from '../libs/pagination';

export class RadicalsQueryParams extends PaginationQueryParams {
  @IsOptional()
  @Matches(RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER, { message: `"$value"わ検索不可能なよみがなです。` })
  readonly nameLike?: string;

  @IsOptional()
  @IsInt({ message: '画数わ整数で入力してください。' })
  @Min(1, { message: '画数わ$constraint1以上で入力してください。' })
  readonly numberOfStrokes?: number;
}
