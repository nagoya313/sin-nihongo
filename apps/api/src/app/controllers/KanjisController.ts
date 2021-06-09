import { JsonController, Get } from 'routing-controllers';
import { KanjisQueryParams, PaginationQueryParams, Pagination, Kanji as ApiKanji } from '@sin-nihongo/api-interfaces';
import { Kanji } from '../entities/Kanji';
import { ValidateQueryParams } from '../libs/decorators';
import { entityFindOptions } from '../repositories/EntityRepository';

@JsonController()
export class KanjisController {
  @Get('/kanjis')
  async index(@ValidateQueryParams search: KanjisQueryParams, @ValidateQueryParams page: PaginationQueryParams) {
    const [radicals, count] = await Kanji.findAndCount(entityFindOptions(search, page));
    return new Pagination<ApiKanji, Kanji>(radicals, count, page);
  }
}
