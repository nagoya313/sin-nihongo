import { Types } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import { flatten, uniq } from 'underscore';
import { NotFoundError } from 'routing-controllers';
import { Glyph as ApiGlyph } from '@sin-nihongo/api-interfaces';
import { glyphData, includesGlyphData } from '../libs/glyph';
import { Glyph, GlyphModel } from '../models/glyph';
import { GlyphsQueryParams } from '../forms/GlyphsForm';

export class GlyphRepository {
  static async findAndCount(params: GlyphsQueryParams): Promise<[PaginationModel<Glyph>, ApiGlyph[]]> {
    const glyphs = await GlyphModel.paginate({
      query: params.name && { name: { $regex: params.name, $options: 'i' } },
      sort: { name: 'asc' },
      limit: 20,
      page: params.page,
    });
    const includeGlyphs = await Promise.all(glyphs.docs.map((glyph) => includesGlyphData(glyph, this.findOneOrFail)));
    return [glyphs, uniq(flatten(includeGlyphs), 'name')];
  }

  static async findOne(id: string) {
    return glyphData(id, this.findOneOrFail, this.findByIdOrFail);
  }

  private static async findOneOrFail(name) {
    const glyph: Glyph | null = await GlyphModel.findOne({ name: name }).exec();
    if (!glyph) {
      throw new NotFoundError(`"${name}"のグリフわ見つかりませんでした。`);
    }
    return glyph;
  }

  private static async findByIdOrFail(id) {
    const glyph: Glyph | null = await GlyphModel.findById(Types.ObjectId(id)).exec();
    if (!glyph) {
      throw new NotFoundError(`"${id}"のグリフわグリフウィキから見つかりませんでした。`);
    }
    return glyph;
  }
}
