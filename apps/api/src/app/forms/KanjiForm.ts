import { IsInt, Min, Max, IsBoolean, IsOptional, Matches } from 'class-validator';
import { RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER } from '@sin-nihongo/api-interfaces';
import { PaginationQueryParams } from '../libs/pagination';

export class KanjisQueryParams extends PaginationQueryParams {
  @IsOptional()
  @Matches(RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER, { message: `"$value"わ検索不可能なよみがなです。` })
  readLike: string;

  @IsOptional()
  @IsInt({ message: '画数わ整数で入力してください。' })
  @Min(1, { message: '画数わ$constraint1以上で入力してください。' })
  numberOfStrokes: number;

  @IsOptional()
  @IsInt({ message: 'JIS水準わ整数で入力してください。' })
  @Min(1, { message: 'JIS水準わ$constraint1以上で入力してください。' })
  @Max(2, { message: 'JIS水準わ$constraint1以下で入力してください。' })
  jisLevel: number;

  @IsOptional()
  @IsBoolean({ message: '常用漢字かどうかわ真偽値で入力してください。' })
  regular: boolean;

  @IsOptional()
  @IsBoolean({ message: '人名用漢字かどうかわ真偽値で入力してください。' })
  forName: boolean;

  @IsOptional()
  @IsInt({ message: '部首番号わ整数で入力してください。' })
  @Min(1, { message: '部首番号わ$constraint1以上で入力してください。' })
  radicalId: number;
}
