import * as MojiJS from 'mojijs';
import { Kanji } from '../entities/Kanji';
import { KanjisQueryParams } from '../forms/KanjiForm';
import { queryBuilder, commonFindManyOption, makeWhereConditions } from '../libs/queryBuilder';

export class KanjiRepository {
  static findAndCount(params: KanjisQueryParams) {
    const whereConditions = makeWhereConditions<Kanji>();

    if (params.ucs) {
      if (params.ucsParam) {
        whereConditions.id = params.ucsParam;
      } else if (params.kanjiParam) {
        whereConditions.id = params.kanjiParam;
      }
    }

    return Kanji.findAndCount({
      where: whereConditions,
      ...commonFindManyOption(params.page),
    });
  }

  private static query(params: KanjisQueryParams) {
    return queryBuilder(Kanji, [
      {
        where:
          '(EXISTS(SELECT FROM unnest(kunyomi) yomi WHERE yomi LIKE :q1) OR EXISTS(SELECT FROM unnest(onyomi) yomi WHERE yomi LIKE :q2))',
        parameters: params.readLike && {
          q1: `${params.readLike}%`,
          q2: `${MojiJS.toKatakana(params.readLike)}%`,
        },
      },
      {
        where: 'number_of_strokes = :q3',
        parameters: { q3: params.numberOfStrokes },
      },
      {
        where: 'jis_level = :q4',
        parameters: { q4: params.jisLevel },
      },
      {
        where: 'regular = :q5',
        parameters: { q4: params.regular },
      },
      {
        where: 'for_name = :q6',
        parameters: { q4: params.forName },
      },
      {
        where: 'radical_id = :q7',
        parameters: { q7: params.radicalId },
      },
      {
        where: 'id = :q8',
        parameters: {
          q7: params.ucs && params.ucsParam ? params.ucsParam : params.kanjiParam ? params.kanjiParam : undefined,
        },
      },
    ]);
  }
}
