import { PaginationModel } from 'mongoose-paginate-ts';
import { Glyph as ApiGlyph, GlyphsResponse } from '@sin-nihongo/api-interfaces';
import { Glyph } from '../models/glyph';

export class GlyphResponse {
  toResponse(glyph: Glyph): ApiGlyph {
    return {
      id: glyph._id.toString(),
      name: glyph.name,
      data: glyph.data,
    };
  }

  async toIndexResponse(
    glyphsAndincludeGlyphs: Promise<[PaginationModel<Glyph>, ApiGlyph[]]>
  ): Promise<GlyphsResponse> {
    const [glyphs, includeGlyphs] = await glyphsAndincludeGlyphs;
    return {
      data: {
        items: glyphs.docs.map((doc) => this.toResponse(doc)),
        meta: {
          totalItems: glyphs.totalDocs,
          itemsPerPage: 20,
          itemCount: glyphs.docs.length,
          totalPages: glyphs.totalPages,
          currentPage: glyphs.page || 1,
        },
      },
      includeGlyphs: includeGlyphs,
    };
  }
}
