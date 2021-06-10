import { Glyphwiki } from '../services/Glyphwiki';
import { glyphData } from '../libs/glyph';

export class GlyphwikiRepository {
  static findByNameOrFail(name: string) {
    return glyphData(name, Glyphwiki.getData);
  }
}
