import { JsonController, Get, QueryParams } from 'routing-controllers';
import { GetKanjisParams } from '@sin-nihongo/sin-nihongo-params';
import { PaginationQueryParams } from '../params/PaginationQueryParams';
import { KanjiRepository } from '../repositories/KanjiRepository';
import { KanjiResponse } from '../responses/KanjiResponse';

@JsonController()
export class KanjisController {
  @Get('/kanjis')
  async index(@QueryParams() searchParams: GetKanjisParams, @QueryParams() pageParams: PaginationQueryParams) {
    return this.response.toIndexResponse(KanjiRepository.findAndCount(searchParams, pageParams), pageParams);
  }

  private response = new KanjiResponse();
}
