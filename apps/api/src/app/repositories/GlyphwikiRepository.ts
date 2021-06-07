import { GlyphwikiQueryParams } from '@sin-nihongo/api-interfaces';
import { glyphData } from '../libs/glyph';
import { glyphwikiDataGet } from '../services/glyphwiki';

export class GlyphwikiRepository {
  static async findOne(params: GlyphwikiQueryParams) {
    return glyphData(params.glyphwikiApiRequestParam, glyphwikiDataGet);
  }
}
