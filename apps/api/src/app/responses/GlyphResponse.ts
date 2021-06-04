import { PaginationModel } from 'mongoose-paginate-ts';
import { Glyph as ApiGlyph, Glyphs } from '@sin-nihongo/api-interfaces';
import { Glyph } from '../models/glyph';

export class GlyphResponse {
  toResponse(glyph: Glyph): ApiGlyph {
    return {
      id: glyph._id.toString(),
      name: glyph.name,
      data: glyph.data,
    };
  }

  toIndexResponse(data: PaginationModel<Glyph>, incldeGlyphs: ApiGlyph[]): Glyphs {
    return {
      items: data.docs.map((doc) => this.toResponse(doc)),
      meta: {
        totalItems: data.totalDocs,
        itemsPerPage: 20,
        itemCount: data.docs.length,
        totalPages: data.totalPages,
        currentPage: data.page || 1,
      },
      includeGlyphs: incldeGlyphs,
    };
  }
}
