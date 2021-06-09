import { Get, JsonController, QueryParams } from 'routing-controllers';
import { GetGlyphwikiQueryParams } from '@sin-nihongo/sin-nihongo-params';
import { Glyphwiki } from '../services/glyphwiki';

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
