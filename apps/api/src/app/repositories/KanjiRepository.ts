import * as MojiJS from 'mojijs';
import { createQueryBuilder } from 'typeorm';
import { Kanji } from '../entities/Kanji';
import { KanjisQueryParams } from '../forms/KanjiForm';
import { genericFindAndCount } from '../libs/queryBuilder';

export class KanjiRepository {
  static findAndCount(params: KanjisQueryParams) {
    return genericFindAndCount(this.query(params), params.page);
  }

  private static query(params: KanjisQueryParams) {
    let base = createQueryBuilder(Kanji, 'kanjis');

    if (params.readLike) {
      base = base.andWhere(
        '(EXISTS(SELECT FROM unnest(kunyomi) yomi WHERE yomi LIKE :q1) OR EXISTS(SELECT FROM unnest(onyomi) yomi WHERE yomi LIKE :q2))',
        {
          q1: `${params.readLike}%`,
          q2: `${MojiJS.toKatakana(params.readLike)}%`,
        }
      );
    }

    if (params.numberOfStrokes) {
      base = base.andWhere('number_of_strokes = :q3', { q3: params.numberOfStrokes });
    }

    if (params.jisLevel) {
      base = base.andWhere('jis_level = :q4', { q4: params.jisLevel });
    }

    if (typeof params.regular !== 'undefined') {
      base = base.andWhere('regular = :q5', { q5: params.regular });
    }

    if (typeof params.forName !== 'undefined') {
      base = base.andWhere('for_name = :q6', { q6: params.forName });
    }

    if (params.radicalId) {
      base = base.andWhere('radical_id = :q7', { q7: params.radicalId });
    }

    if (params.ucs) {
      if (params.ucsQuery) {
        base = base.andWhere('id = :q8', { q8: params.ucsQuery });
      } else if (params.kanjiQuery) {
        base = base.andWhere('id = :q8', { q8: params.kanjiQuery });
      }
    }

    return base.orderBy('kanjis.id');
  }
}
