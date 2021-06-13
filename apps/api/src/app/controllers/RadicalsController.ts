import { Get, JsonController, QueryParams } from 'routing-controllers';
import { GetRadicalsParams } from '@sin-nihongo/sin-nihongo-params';
import { PaginationQueryParams } from '../params/PaginationQueryParams';
import { RadicalRepository } from '../repositories/RadicalRepository';
import { RadicalResponse } from '../responses/RadicalResponse';

const sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

@JsonController()
export class RadicalsController {
  @Get('/radicals')
  async index(@QueryParams() searchParams: GetRadicalsParams, @QueryParams() pageParams: PaginationQueryParams) {
    await sleep(1000);
    return this.response.toIndexResponse(RadicalRepository.findAndCount(searchParams, pageParams), pageParams);
  }

  private response = new RadicalResponse();
}
