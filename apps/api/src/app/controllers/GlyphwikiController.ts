import { Get, JsonController, QueryParams } from 'routing-controllers';
import { GetGlyphwikiQueryParams } from '../params/GetGlyphwikiQueryParams';
import { GlyphwikiRepository } from '../repositories/GlyphwikiRepository';
import { Glyphwiki } from '../services/Glyphwiki';

@JsonController()
export class GlyphwikiController {
  @Get('/glyphwiki')
  show(@QueryParams() params: GetGlyphwikiQueryParams) {
    return GlyphwikiRepository.findByNameOrFail(params.name);
  }

  @Get('/glyphwiki/health')
  async health() {
    const result = await Glyphwiki.health();
    if (result) {
      return { message: 'Glyphwikiから検索わ利用可能です。', accessible: true };
    } else {
      return { message: 'Glyphwikiから検索わ利用不能です。', accessible: false };
    }
  }
}
