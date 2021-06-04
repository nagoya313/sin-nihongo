import { JsonController, Get } from 'routing-controllers';
import { GlyphwikiQueryParams } from '../forms/GlyphwikiForm';
import { ValidateQueryParams } from '../libs/decorators';
import { GlyphwikiRepository } from '../repositories/GlyphwikiRepository';

@JsonController()
export class GlyphwikiController {
  @Get('/glyphwiki')
  async show(@ValidateQueryParams params: GlyphwikiQueryParams) {
    return await GlyphwikiRepository.findOne(params);
  }
}
