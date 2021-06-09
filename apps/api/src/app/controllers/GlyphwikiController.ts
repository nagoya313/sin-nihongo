import { JsonController, Get } from 'routing-controllers';
import { GlyphwikiSearchParams } from '@sin-nihongo/api-interfaces';
import { GlyphwikiQueryParams } from '../forms/glyphwiki';
import { ValidateQueryParams } from '../libs/decorators';
import { glyphData } from '../libs/glyph';
import { glyphwikiDataGet, glyphwikiHelth } from '../services/glyphwiki';

@JsonController()
export class GlyphwikiController {
  @Get('/glyphwiki')
  async show(@ValidateQueryParams params: GlyphwikiSearchParams) {
    return await glyphData(new GlyphwikiQueryParams(params).name, glyphwikiDataGet);
  }

  @Get('/glyphwiki/health')
  async health() {
    return await glyphwikiHelth();
  }
}
