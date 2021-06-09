import { IsInt, IsOptional, Matches, Max, Min } from 'class-validator';
import {
  GetGlyphsRequest,
  GetGlyphwikiRequest,
  GetRadicalsRequest,
  PaginationRequest,
} from '@sin-nihongo/api-interfaces';

const GLYPHWIKI_QUERY_PARAMS_MATCHER = /^([\da-z-_]+(@\d+)?|.)$/;
const RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER = /^(?!.*[ぢづゐゑを])[\u3040-\u3093ー]+$/;

export class GetGlyphwikiParams implements GetGlyphwikiRequest {
  @Matches(GLYPHWIKI_QUERY_PARAMS_MATCHER, { message: `"$value"わ検索不可能なクエリです` })
  q: string;
}

export class GetRadicalsParams implements GetRadicalsRequest {
  @IsOptional()
  @Matches(RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER, { message: `"$value"わ検索不可能なよみがなです` })
  nameLike?: string;

  @IsOptional()
  @IsInt({ message: '画数わ整数で入力してください' })
  @Min(1, { message: '画数わ$constraint1以上で入力してください' })
  numberOfStrokes?: number;
}

export class GetGlyphsParams implements GetGlyphsRequest {
  @IsOptional()
  nameLike?: string;
}

export class PaginationParams implements PaginationRequest {
  @IsOptional()
  @Min(1, { message: 'ページ番号わ$constraint1以上で入力してください' })
  @IsInt({ message: 'ページ番号わ整数で入力してください' })
  page?: number;

  @IsOptional()
  @Min(1, { message: 'ページ番号わ$constraint1以上で入力してください' })
  @Max(200, { message: 'ページ番号わ$constraint1以下で入力してください' })
  @IsInt({ message: 'ページ番号わ整数で入力してください' })
  limit?: number;
}
