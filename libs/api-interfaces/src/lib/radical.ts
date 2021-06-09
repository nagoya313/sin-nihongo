import { IsInt, IsOptional, Matches, Min } from 'class-validator';
import { PaginationParams } from './pagination';

export const RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER = /^(?!.*[ぢづゐゑを])[\u3040-\u3093ー]*$/;

export class RadicalsSearchParams extends PaginationParams {
  @IsOptional()
  @Matches(RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER, { message: `"$value"わ検索不可能なよみがなです` })
  nameLike?: string;

  @IsOptional()
  @IsInt({ message: '画数わ整数で入力してください' })
  @Min(1, { message: '画数わ$constraint1以上で入力してください' })
  numberOfStrokes?: number;
}

export interface RadicalResponse {
  readonly id: number;
  readonly numberOfStrokes: number;
  readonly names: string[];
  readonly character: string;
}
