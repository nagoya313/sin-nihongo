import { JsonController, Get } from 'routing-controllers';
import { ValidateQueryParams } from '../libs/decorators';
import { RadicalsQueryParams } from '../forms/RadicalForm';
import { RadicalRepository } from '../repositories/RadicalRepository';
import { RadicalResponse } from '../responses/RadicalResponse';

@JsonController()
export class RadicalsController {
  @Get('/radicals')
  async index(@ValidateQueryParams query: RadicalsQueryParams) {
    return this.responser.toIndexResponse(await RadicalRepository.findAndCount(query), query);
  }

  private readonly responser = new RadicalResponse();
}
