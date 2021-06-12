import { Get, JsonController, QueryParams } from 'routing-controllers';
import { GetGlyphwikiQueryParams } from '../params/GetGlyphwikiQueryParams';
import { GlyphwikiRepository } from '../repositories/GlyphwikiRepository';

@JsonController()
export class GlyphwikiController {
  @Get('/glyphwiki')
  show(@QueryParams() params: GetGlyphwikiQueryParams) {
    return GlyphwikiRepository.findByNameOrFail(params.name);
  }
}
