import { Types } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import { flatten, uniq } from 'underscore';
import { NotFoundError, BadRequestError } from 'routing-controllers';
import { Glyph as ApiGlyph, GlyphsSearchParams, GlyphParams } from '@sin-nihongo/api-interfaces';
import { PostGlyphParams } from '@sin-nihongo/sin-nihongo-params';
import { glyphData, includesGlyphData } from '../libs/glyph';
import { Glyph, GlyphModel } from '../models/glyph';

export class GlyphRepository {
  static async findAndCount(search: GlyphsSearchParams): Promise<[PaginationModel<Glyph>, ApiGlyph[]]> {
    const glyphs = await GlyphModel.paginate({
      query: search.nameLike && { name: { $regex: search.nameLike, $options: 'i' } },
      sort: { name: 'asc' },
      limit: search.limit,
      page: search.page,
    });
    const includeGlyphs = await Promise.all(glyphs.docs.map((glyph) => includesGlyphData(glyph, this.findOneOrFail)));
    return [glyphs, uniq(flatten(includeGlyphs), 'name')];
  }

  static async findOne(id: string) {
    return glyphData(id, this.findOneOrFail, this.findByIdOrFail);
  }

  static async create(params: PostGlyphParams) {
    try {
      await includesGlyphData(params.glyph, this.findOneOrFail);
    } catch (error) {
      throw new BadRequestError(`未実装のグリフお含んでいます。${error.message}`);
    }
    return GlyphModel.create(params.glyph);
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
