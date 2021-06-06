import { Types } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import { flatten, uniq } from 'underscore';
import { NotFoundError, BadRequestError } from 'routing-controllers';
import { Glyph as ApiGlyph, GlyphsQueryParams, GlyphParams } from '@sin-nihongo/api-interfaces';
import { glyphData, includesGlyphData } from '../libs/glyph';
import { Glyph, GlyphModel } from '../models/glyph';

export class GlyphRepository {
  static async findAndCount(params: GlyphsQueryParams): Promise<[PaginationModel<Glyph>, ApiGlyph[]]> {
    const glyphs = await GlyphModel.paginate({
      query: params.nameLike && { name: { $regex: params.nameLike, $options: 'i' } },
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

  static async create(params: GlyphParams) {
    try {
      await includesGlyphData(params.glyph, this.findOneOrFail);
    } catch (error) {
      throw new BadRequestError(`未実装のグリフお含んでいます。${error.message}`);
    }
    GlyphModel.create(params.glyph);
  }

  static async deleteOne(id: string) {
    const glyph = await GlyphModel.findByIdAndDelete(Types.ObjectId(id)).exec();
    if (!glyph) {
      throw new NotFoundError(`"${id}"のグリフわ見つかりませんでした。`);
    }
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
