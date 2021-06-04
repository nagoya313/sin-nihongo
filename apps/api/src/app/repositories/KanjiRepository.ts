import { Raw } from 'typeorm';
import { Kanji } from '../entities/Kanji';
import { KanjisQueryParams } from '../forms/KanjiForm';
import { findAndCount, makeWhereConditions, permit } from '../libs/queryBuilder';
import { toQueryYomigana } from '../libs/kana';

export class KanjiRepository {
  static findAndCount(params: KanjisQueryParams) {
    const whereConditions = makeWhereConditions<Kanji>(
      permit(params, ['regular', 'forName', 'numberOfStrokes', 'radicalId', 'jisLevel'])
    );

    if (params.ucs) {
      if (params.ucsParam) {
        whereConditions.ucs = params.ucsParam;
      } else if (params.kanjiParam) {
        whereConditions.ucs = params.kanjiParam;
      }
    }
    if (params.readLike) {
      whereConditions.kunyomi = Raw(
        (alias) => {
          return `EXISTS(SELECT FROM unnest(array_cat("Kanji"."onyomi", ${alias})) name WHERE name LIKE :name)`;
        },
        { name: `${toQueryYomigana(params.readLike)}%` }
      );
    }

    return findAndCount(Kanji, whereConditions, params.page);
  }
}
