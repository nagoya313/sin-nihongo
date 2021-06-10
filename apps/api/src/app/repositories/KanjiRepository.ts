import { Raw } from 'typeorm';
import { Kanji } from '../entities/Kanji';
import { GetKanjisQueryParams } from '../params/GetKanjisQueryParams';
import { PaginationQueryParams } from '../params/PaginationQueryParams';
import { findManyOptions, undefinedSkipParams } from './EntityRepository';
import { toQueryYomigana } from '../libs/kana';

export class KanjiRepository {
  static findAndCount(searchParams: GetKanjisQueryParams, pageParams: PaginationQueryParams) {
    return Kanji.findAndCount(
      findManyOptions<Kanji>(
        {
          regular: undefinedSkipParams(searchParams.regular),
          forName: undefinedSkipParams(searchParams.forName),
          jisLevel: undefinedSkipParams(searchParams.jisLevel),
          radicalId: undefinedSkipParams(searchParams.radicalId),
          numberOfStrokes: undefinedSkipParams(searchParams.numberOfStrokes),
          ucs: undefinedSkipParams(searchParams.ucsParam),
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
