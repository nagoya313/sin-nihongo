import { Raw } from 'typeorm';
import { GetKanjisParams } from '@sin-nihongo/sin-nihongo-params';
import { Kanji } from '../entities/Kanji';
import { PaginationQueryParams } from '../params/PaginationQueryParams';
import { findManyOptions, undefinedSkipParams } from './EntityRepository';

export class KanjiRepository {
  static findAndCount(searchParams: GetKanjisParams, pageParams: PaginationQueryParams) {
    return Kanji.findAndCount(findManyOptions<Kanji>({}, pageParams));
  }
}
