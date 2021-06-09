import { Get, JsonController, QueryParams } from 'routing-controllers';
import { GetRadicalsParams } from '@sin-nihongo/sin-nihongo-params';
import { PaginationQueryParams } from '../params/PaginationQueryParams';
import { RadicalRepository } from '../repositories/RadicalRepository';
import { RadicalResponse } from '../responses/RadicalResponse';

@JsonController()
export class RadicalsController {
  @Get('/radicals')
  index(@QueryParams() searchParams: GetRadicalsParams, @QueryParams() pageParams: PaginationQueryParams) {
    return this.response.toIndexResponse(RadicalRepository.findAndCount(searchParams, pageParams), pageParams);
  }

  private response = new RadicalResponse();
}
