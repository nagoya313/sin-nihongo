import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Raw } from 'typeorm';
import * as mojiJS from 'mojijs';
import { RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER } from './radical';
import { IsBoolean, IsInt, Matches, Max, Min, ParamsExpose, QueryExpose, CustomQueryExpose } from './decorator';

export const KANJI_USC_QUERY_PARAMS_MATCHER = /^((u[\da-f]{4})|[\u4E00-\u9FFF])$/;

export class KanjisSearchParams {
  @ParamsExpose
  @IsOptional()
  @Matches(KANJI_USC_QUERY_PARAMS_MATCHER)
  kanji?: string;

  @ParamsExpose
  @IsOptional()
  @Matches(RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER)
  readLike?: string;

  @QueryExpose
  @IsOptional()
  @IsInt
  @Min(1)
  numberOfStrokes?: number;

  @QueryExpose
  @IsOptional()
  @IsInt
  @Min(1)
  @Max(2)
  jisLevel?: number;

  @QueryExpose
  @IsOptional()
  @IsBoolean
  regular?: boolean;

  @QueryExpose
  @IsOptional()
  @IsBoolean
  forName?: boolean;

  @QueryExpose
  @IsOptional()
  @IsInt
  @Min(1)
  radicalId?: number;
}

export class KanjisQueryParams extends KanjisSearchParams {
  @CustomQueryExpose
  @Transform(({ obj }) => {
    if (obj.kanji) {
      if (obj.ucsParam) {
        return obj.ucsParam;
      } else if (obj.kanjiParam) {
        return obj.kanjiParam;
      }
    }
    return undefined;
  })
  ucs: number;

  @CustomQueryExpose
  @Transform(
    ({ obj }) =>
      obj.readLike &&
      Raw(
        (alias) => {
          return `EXISTS(SELECT FROM unnest(array_cat("Kanji"."onyomi", ${alias})) name WHERE name LIKE :name)`;
        },
        { name: `${obj.toQueryYomigana(obj.readLike)}%` }
      )
  )
  kunyomi: typeof Raw;

  get ucsParam() {
    return this.kanji?.match(/^u[\da-f]{4,5}$/) ? parseInt(this.kanji.replace('u', ''), 16) : undefined;
  }

  get kanjiParam() {
    return this.mojiData.type.is_kanji ? this.kanji.charCodeAt(0) : undefined;
  }

  private get mojiData() {
    return this.kanji && mojiJS.getMojiData(mojiJS.codePointAt(this.kanji[0]));
  }

  private toQueryYomigana(text: string) {
    return mojiJS.toHalfWidthKana(mojiJS.toKatakana(text));
  }
}
