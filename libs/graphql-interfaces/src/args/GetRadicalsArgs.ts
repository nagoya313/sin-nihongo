import { IsInt, IsOptional, Matches, Min } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';
import { RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER } from '../lib/const';

@ArgsType()
export class GetRadicalsArgs {
  @Field({ nullable: true, description: 'よみ' })
  @IsOptional()
  @Matches(RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER, { message: `"$value"わ検索不可能なよみがなです` })
  name?: string;

  @Field(() => Int, { nullable: true, description: '画数' })
  @IsOptional()
  @IsInt({ message: '画数わ整数で入力してください' })
  @Min(1, { message: '画数わ$constraint1以上で入力してください' })
  numberOfStrokes?: number;
}
