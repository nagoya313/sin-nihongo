import { IsInt, Min, IsOptional, Matches } from 'class-validator';
import { PaginationQueryParams } from '../libs/pagination';

export class RadicalsQueryParams extends PaginationQueryParams {
  @IsOptional()
  @Matches(/^(?!.*[ぢづゐゑを])[\u3040-\u3093ー]*$/, { message: `"$value"わ検索不可能なよみがなです。` })
  nameLike: string;

  @IsOptional()
  @IsInt({ message: '画数わ整数で入力してください。' })
  @Min(1, { message: '画数わ$constraint1以上で入力してください。' })
  numberOfStrokes: number;
}
