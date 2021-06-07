import { JsonController, Get } from 'routing-controllers';
import { GlyphwikiQueryParams } from '@sin-nihongo/api-interfaces';
import { ValidateQueryParams } from '../libs/decorators';
import { GlyphwikiRepository } from '../repositories/GlyphwikiRepository';
import { glyphwikiHelth } from '../services/glyphwiki';

@JsonController()
export class GlyphwikiController {
  @Get('/glyphwiki')
  async show(@ValidateQueryParams params: GlyphwikiQueryParams) {
    return await GlyphwikiRepository.findOne(params);
  }

  @Get('/glyphwiki/health')
  async health() {
    return await glyphwikiHelth();
  }
}
