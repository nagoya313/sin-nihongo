import { JsonController, Get } from 'routing-controllers';
import { RadicalsSearchParams, Pagination } from '@sin-nihongo/api-interfaces';
import { Radical } from '../entities/Radical';
import { RadicalsQueryParams } from '../forms/radical';
import { ValidateQueryParams } from '../libs/decorators';
import { entityFindOptions } from '../repositories/EntityRepository';

entityFindOptions;
@JsonController()
export class RadicalsController {
  @Get('/radicals')
  async index(@ValidateQueryParams params: RadicalsSearchParams) {
    const [radicals, count] = await Radical.findAndCount(new RadicalsQueryParams(params).options());
    return new Pagination<Radical>(radicals, count, params);
  }
}
