import { IsBoolean, IsInt, IsOptional, Matches, Max, Min } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';
import { KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER, KANJI_USC_QUERY_PARAMS_MATCHER } from '../lib/const';

@ArgsType()
export class GetKanjisArgs {
  @Field({ nullable: true, description: '漢字' })
  @IsOptional()
  @Matches(KANJI_USC_QUERY_PARAMS_MATCHER, { message: `"$value"わ検索不可能な漢字です` })
  readonly ucs?: string;

  @Field({ nullable: true, description: 'よみ' })
  @IsOptional()
  @Matches(KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER, { message: `"$value"わ検索不可能なよみがなです` })
  readonly read?: string;

  @Field({ nullable: true, description: '訓読み' })
  @IsOptional()
  @Matches(KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER, { message: `"$value"わ検索不可能なよみがなです` })
  readonly kunyomi?: string;

  @Field({ nullable: true, description: '音読み' })
  @IsOptional()
  @Matches(KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER, { message: `"$value"わ検索不可能なよみがなです` })
  readonly onyomi?: string;

  @Field(() => Int, { nullable: true, description: '画数' })
  @IsOptional()
  @IsInt({ message: '画数わ整数で入力してください' })
  @Min(1, { message: '画数わ$constraint1以上で入力してください' })
  readonly numberOfStrokes?: number;

  @Field(() => Int, { nullable: true, description: 'JIS水準' })
  @IsOptional()
  @IsInt({ message: 'JIS水準わ整数で入力してください' })
  @Min(1, { message: 'JIS水準わ$constraint1以上で入力してください' })
  @Max(4, { message: 'JIS水準わ$constraint1以下で入力してください' })
  readonly jisLevel?: number;

  @Field({ nullable: true, description: '常用漢字かどうか' })
  @IsOptional()
  @IsBoolean({ message: '常用漢字かどうかわ真偽値で入力してください' })
  readonly regular?: boolean;

  @Field({ nullable: true, description: '人名用漢字かどうか' })
  @IsOptional()
  @IsBoolean({ message: '人名用漢字かどうかわ真偽値で入力してください' })
  readonly forName?: boolean;

  @Field(() => Int, { nullable: true, description: '部首' })
  @IsOptional()
  @IsInt({ message: '部首番号わ整数で入力してください。' })
  @Min(1, { message: '部首番号わ$constraint1以上で入力してください' })
  readonly radicalId?: number;
}
