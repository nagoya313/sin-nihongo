import { Get, JsonController, QueryParams } from 'routing-controllers';
import { GetGlyphwikiQueryParams } from '../params/GetGlyphwikiQueryParams';
import { Glyphwiki } from '../services/Glyphwiki';

@JsonController()
export class GlyphwikiController {
  @Get('/glyphwiki')
  show(@QueryParams() params: GetGlyphwikiQueryParams) {
    return Glyphwiki.findByNameOrFail(params.name);
  }

  @Get('/glyphwiki/health')
  health() {
    return Glyphwiki.health();
  }
}
