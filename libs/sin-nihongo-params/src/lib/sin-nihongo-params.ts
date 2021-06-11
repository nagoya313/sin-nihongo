import { Length, IsBoolean, IsInt, IsNotEmpty, IsOptional, Matches, Max, Min, ValidateNested } from 'class-validator';
import {
  GetKanjisRequest,
  GetGlyphsRequest,
  GetGlyphwikiRequest,
  GetRadicalsRequest,
  PaginationRequest,
  PostGlyphRequest,
  PostGlyphRequestBody,
} from '@sin-nihongo/api-interfaces';

const GLYPHWIKI_QUERY_PARAMS_MATCHER = /^([\da-z-_]+(@\d+)?|.)$/;
const RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER = /^(?!.*[ぢづゐゑを])[\u3040-\u3093ー]+$/;
const KANJI_USC_QUERY_PARAMS_MATCHER = /^((u[\da-f]{4})|[\u4E00-\u9FFF])$/;

export class GetGlyphwikiParams implements GetGlyphwikiRequest {
  @Matches(GLYPHWIKI_QUERY_PARAMS_MATCHER, { message: `"$value"わ検索不可能なクエリです` })
  readonly q!: string;
}

export class GetRadicalsParams implements GetRadicalsRequest {
  @IsOptional()
  @Matches(RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER, { message: `"$value"わ検索不可能なよみがなです` })
  readonly nameLike?: string;

  @IsOptional()
  @IsInt({ message: '画数わ整数で入力してください' })
  @Min(1, { message: '画数わ$constraint1以上で入力してください' })
  readonly numberOfStrokes?: number;
}

export class GetKanjisParams implements GetKanjisRequest {
  @IsOptional()
  @Matches(KANJI_USC_QUERY_PARAMS_MATCHER, { message: `"$value"わ検索不可能な漢字です` })
  readonly ucs?: string;

  @IsOptional()
  @Matches(RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER, { message: `"$value"わ検索不可能なよみがなです` })
  readonly readLike?: string;

  @IsOptional()
  @IsInt({ message: '画数わ整数で入力してください' })
  @Min(1, { message: '画数わ$constraint1以上で入力してください' })
  readonly numberOfStrokes?: number;

  @IsOptional()
  @IsInt({ message: 'JIS水準わ整数で入力してください' })
  @Min(1, { message: 'JIS水準わ$constraint1以上で入力してください' })
  @Max(2, { message: 'JIS水準わ$constraint1以下で入力してください' })
  readonly jisLevel?: number;

  @IsOptional()
  @IsBoolean({ message: '常用漢字かどうかわ真偽値で入力してください' })
  readonly regular?: boolean;

  @IsOptional()
  @IsBoolean({ message: '人名用漢字かどうかわ真偽値で入力してください' })
  readonly forName?: boolean;

  @IsOptional()
  @IsInt({ message: '部首番号わ整数で入力してください。' })
  @Min(1, { message: '部首番号わ$constraint1以上で入力してください' })
  readonly radicalId?: number;
}

export class GetGlyphsParams implements GetGlyphsRequest {
  @IsOptional()
  @Matches(GLYPHWIKI_QUERY_PARAMS_MATCHER, { message: `"$value"わ検索不可能なクエリです` })
  readonly nameLike?: string;
}

export class PostGlyphParamsBody implements PostGlyphRequestBody {
  @Length(1, 20, { message: 'グリフ名わ$constraint1文字以上$constraint2文字以内で入力してください' })
  readonly name!: string;

  @IsNotEmpty({ message: 'KAGEデータお入力してください' })
  readonly data!: string;
}

export class PostGlyphParams implements PostGlyphRequest {
  @ValidateNested()
  readonly glyph!: PostGlyphParamsBody;
}

export class PaginationParams implements PaginationRequest {
  @IsOptional()
  @Min(1, { message: 'ページ番号わ$constraint1以上で入力してください' })
  @IsInt({ message: 'ページ番号わ整数で入力してください' })
  readonly page?: number;

  @IsOptional()
  @Min(1, { message: 'ページ番号わ$constraint1以上で入力してください' })
  @Max(200, { message: 'ページ番号わ$constraint1以下で入力してください' })
  @IsInt({ message: 'ページ番号わ整数で入力してください' })
  readonly limit?: number;
}
