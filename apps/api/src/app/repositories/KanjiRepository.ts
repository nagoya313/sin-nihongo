import { Raw } from 'typeorm';
import * as mojiJS from 'mojijs';
import { GetKanjisParams } from '@sin-nihongo/sin-nihongo-params';
import { Kanji } from '../entities/Kanji';
import { PaginationQueryParams } from '../params/PaginationQueryParams';
import { findManyOptions, undefinedSkipParams } from './EntityRepository';
import { toQueryYomigana } from '../libs/kana';

const ucsParams = (ucs: string) => {
  if (ucs) {
    const ucsParams = ucs.match(/^u[\da-f]{4,5}$/) ? parseInt(ucs.replace('u', ''), 16) : undefined;
    if (ucsParams) {
      return ucsParams;
    }
    const mojiData = mojiJS.getMojiData(mojiJS.codePointAt(ucs[0]));
    const kanjiParams = mojiData.type.is_kanji ? ucs.charCodeAt(0) : undefined;
    if (kanjiParams) {
      return kanjiParams;
    }
  }
  return undefined;
};

export class KanjiRepository {
  static findAndCount(searchParams: GetKanjisParams, pageParams: PaginationQueryParams) {
    return Kanji.findAndCount(
      findManyOptions<Kanji>(
        {
          regular: undefinedSkipParams(searchParams.regular),
          forName: undefinedSkipParams(searchParams.forName),
          jisLevel: undefinedSkipParams(searchParams.jisLevel),
          radicalId: undefinedSkipParams(searchParams.radicalId),
          numberOfStrokes: undefinedSkipParams(searchParams.numberOfStrokes),
          ucs: undefinedSkipParams(ucsParams(searchParams.ucs)),
          kunyomi: undefinedSkipParams(
            searchParams.readLike,
            Raw(
              (alias) => {
                return `EXISTS(SELECT FROM unnest(array_cat("Kanji"."onyomi", ${alias})) name WHERE name LIKE :name)`;
              },
              { name: searchParams.readLike && `${toQueryYomigana(searchParams.readLike)}%` }
            )
          ),
        },
        pageParams
      )
    );
  }
}
