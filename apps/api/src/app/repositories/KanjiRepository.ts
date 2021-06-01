import * as MojiJS from 'mojijs';
import { createQueryBuilder } from 'typeorm';
import { Kanji } from '../entities/Kanji';
import { KanjisQueryParams } from '../forms/KanjiForm';
import { genericFindAndCount } from '../libs/queryBuilder';

const mojiJS = MojiJS['default'];

export class KanjiRepository {
  static findAndCount(params: KanjisQueryParams) {
    return genericFindAndCount(this.query(params), params.page);
  }

  private static query(params: KanjisQueryParams) {
    let base = createQueryBuilder(Kanji, 'kanjis');

    if (params.readLike) {
      base = base.andWhere('EXISTS(SELECT FROM unnest(onyomi) yomi WHERE yomi LIKE :q1)', {
        q1: `${mojiJS.toRomajiFromHiragana(params.readLike).toUpperCase()}%`,
      });
    }

    if (params.numberOfStrokes) {
      base = base.andWhere('number_of_strokes = :q2', { q2: params.numberOfStrokes });
    }

    if (params.jisLevel) {
      base = base.andWhere('jisLevel = :q3', { q3: params.jisLevel });
    }

    if (typeof params.regular !== 'undefined') {
      base = base.andWhere('regular = :q4', { q4: params.regular });
    }

    if (typeof params.forName !== 'undefined') {
      base = base.andWhere('for_name = :q5', { q5: params.forName });
    }

    if (params.radicalId) {
      base = base.andWhere('radical_id = :q6', { q6: params.radicalId });
    }

    return base.orderBy('kanjis.id');
  }
}
