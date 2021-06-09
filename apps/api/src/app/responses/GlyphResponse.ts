import { PaginationModel } from 'mongoose-paginate-ts';
import { Glyphs, GlyphResponse as ApiGlyphResponse } from '@sin-nihongo/api-interfaces';
import { Glyph } from '../models/glyph';

export class GlyphResponse {
  toResponse(glyph: Glyph): ApiGlyphResponse {
    return {
      id: glyph._id.toString(),
      name: glyph.name,
      data: glyph.data,
    };
  }

  async toIndexResponse(glyphsAndincludeGlyphs: Promise<[PaginationModel<Glyph>, ApiGlyphResponse[]]>): Glyphs {
    const [glyphs, includeGlyphs] = await glyphsAndincludeGlyphs;
    return {
      items: glyphs.docs.map((doc) => this.toResponse(doc)),
      meta: {
        totalItems: glyphs.totalDocs,
        itemsPerPage: 20,
        itemCount: glyphs.docs.length,
        totalPages: glyphs.totalPages,
        currentPage: glyphs.page || 1,
      },
      includeGlyphs: includeGlyphs,
    };
  }
}
