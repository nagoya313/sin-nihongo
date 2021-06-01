import { JsonController, Get } from 'routing-controllers';
import { KanjiRepository } from '../repositories/KanjiRepository';
import { KanjiResponse } from '../responses/KanjiResponse';
import { KanjisQueryParams } from '../forms/KanjiForm';
import { ValidateQueryParams } from '../libs/decorators';

@JsonController()
export class KanjisController {
  @Get('/kanjis')
  async index(@ValidateQueryParams query: KanjisQueryParams) {
    return this.responser.toIndexResponse(await KanjiRepository.findAndCount(query), query);
  }

  private readonly responser = new KanjiResponse();
}
