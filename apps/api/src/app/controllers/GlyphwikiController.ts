import { JsonController, Get, NotFoundError } from 'routing-controllers';
import { glyphwikiData } from '../libs/glyphwiki';
import { GlyphwikiQueryParams } from '../forms/GlyphwikiForm';
import { ValidateQueryParams } from '../libs/decorators';

@JsonController()
export class GlyphwikiController {
  @Get('/glyphwiki')
  async show(@ValidateQueryParams params: GlyphwikiQueryParams) {
    const data = await glyphwikiData(params.glyphwikiApiRequestParam);
    if (typeof data === 'undefined') {
      throw new NotFoundError(`"${params.q}"はグリフウィキからグリフが見つかりませんでした。`);
    }
    return data;
  }
}
