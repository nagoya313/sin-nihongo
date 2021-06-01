import { createQueryBuilder } from 'typeorm';
import { Kanji } from '../entities/Kanji';
import { KanjisQueryParams } from '../forms/KanjiForm';
import { genericFindAndCount } from '../libs/queryBuilder';

export class KanjiRepository {
  static findAndCount(params: KanjisQueryParams) {
    return genericFindAndCount(this.query(params), params.page);
  }

  private static query(params: KanjisQueryParams) {
    return createQueryBuilder(Kanji, 'kanjis');
  }
}
