import { IsInt, Min, IsOptional, Matches } from 'class-validator';

export class RadicalsQueryParams {
  @IsOptional()
  @Matches(/^(?!.*[ぢづゐゑを])[\u3040-\u3093ー]*$/, { message: `"$value"わ検索不可能なよみがなです。` })
  nameLike: string;

  @IsOptional()
  @IsInt({ message: 'わ整数で入力してください。' })
  @Min(1, { message: 'わ$constraint1以上で入力してください。' })
  numberOfStrokes: number;
}
