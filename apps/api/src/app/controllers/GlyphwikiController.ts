import { JsonController, Get } from 'routing-controllers';
import { glyphData } from '../libs/glyph';
import { GlyphwikiQueryParams } from '../forms/GlyphwikiForm';
import { ValidateQueryParams } from '../libs/decorators';
import { glyphwikiDataGet } from '../libs/glyphwiki';

@JsonController()
export class GlyphwikiController {
  @Get('/glyphwiki')
  async show(@ValidateQueryParams params: GlyphwikiQueryParams) {
    return await glyphData(params.glyphwikiApiRequestParam, glyphwikiDataGet);
  }
}
