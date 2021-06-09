import { Get, JsonController, QueryParams } from 'routing-controllers';
import { GetRadicalsParams } from '@sin-nihongo/sin-nihongo-params';
import { PaginationQueryParams } from '../params/PaginationQueryParams';
import { RadicalRepository } from '../repositories/RadicalRepository';

@JsonController()
export class RadicalsController {
  @Get('/radicals')
  index(@QueryParams() searchParams: GetRadicalsParams, @QueryParams() pageParams: PaginationQueryParams) {
    console.log(searchParams);
    return RadicalRepository.findAndCount(searchParams, pageParams);
  }
}
