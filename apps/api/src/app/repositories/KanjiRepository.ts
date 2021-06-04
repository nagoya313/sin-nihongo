import { Raw } from 'typeorm';
import { Kanji } from '../entities/Kanji';
import { KanjisQueryParams } from '../forms/KanjiForm';
import { commonFindManyOption, makeWhereConditions } from '../libs/queryBuilder';
import { toQueryYomigana } from '../libs/kana';

export class KanjiRepository {
  static findAndCount(params: KanjisQueryParams) {
    const whereConditions = makeWhereConditions<Kanji>();

    if (params.ucs) {
      if (params.ucsParam) {
        whereConditions.ucs = params.ucsParam;
      } else if (params.kanjiParam) {
        whereConditions.ucs = params.kanjiParam;
      }
    }
    if (typeof params.regular !== 'undefined') {
      whereConditions.regular = params.regular;
    }
    if (typeof params.forName !== 'undefined') {
      whereConditions.forName = params.forName;
    }
    if (params.numberOfStrokes) {
      whereConditions.numberOfStrokes = params.numberOfStrokes;
    }
    if (params.radicalId) {
      whereConditions.radicalId = params.radicalId;
    }
    if (params.jisLevel) {
      whereConditions.jisLevel = params.jisLevel;
    }
    if (params.readLike) {
      whereConditions.kunyomi = Raw(
        (alias) => {
          return `EXISTS(SELECT FROM unnest(array_cat("Kanji"."onyomi", ${alias})) name WHERE name LIKE :name)`;
        },
        { name: `${toQueryYomigana(params.readLike)}%` }
      );
    }

    return Kanji.findAndCount({
      where: whereConditions,
      ...commonFindManyOption(params.page),
    });
  }
}
