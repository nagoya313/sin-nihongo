import { JsonController, Get, QueryParams } from 'routing-controllers';
import { GetKanjisQueryParams } from '../params/GetKanjisQueryParams';
import { PaginationQueryParams } from '../params/PaginationQueryParams';
import { KanjiRepository } from '../repositories/KanjiRepository';
import { KanjiResponse } from '../responses/KanjiResponse';

@JsonController()
export class KanjisController {
  @Get('/kanjis')
  async index(@QueryParams() searchParams: GetKanjisQueryParams, @QueryParams() pageParams: PaginationQueryParams) {
    return this.response.toIndexResponse(KanjiRepository.findAndCount(searchParams, pageParams), pageParams);
  }

  private response = new KanjiResponse();
}
