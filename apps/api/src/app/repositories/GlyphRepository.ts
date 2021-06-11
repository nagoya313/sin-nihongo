import { Types } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import { flatten, uniq } from 'underscore';
import { NotFoundError, BadRequestError, InternalServerError } from 'routing-controllers';
import { Glyph as ApiGlyph } from '@sin-nihongo/api-interfaces';
import { GetGlyphsParams, PostGlyphParams } from '@sin-nihongo/sin-nihongo-params';
import { PaginationQueryParams } from '../params/PaginationQueryParams';
import { glyphData, includeGlyphData } from '../libs/glyph';
import { Glyph, GlyphModel } from '../models/glyph';

export class GlyphRepository {
  static async findAndCount(
    searchParams: GetGlyphsParams,
    pageParams: PaginationQueryParams
  ): Promise<[PaginationModel<Glyph>, ApiGlyph[]]> {
    const glyphs = await GlyphModel.paginate({
      query: searchParams.nameLike && { name: { $regex: searchParams.nameLike, $options: 'i' } },
      sort: { name: 'asc' },
      limit: pageParams.take,
      page: pageParams.currentPage,
    });
    if (glyphs) {
      const includeGlyphs = await Promise.all(glyphs.docs.map((glyph) => includeGlyphData(glyph, this.findOneOrFail)));
      return [glyphs, uniq(flatten(includeGlyphs), 'name')];
    } else {
      throw InternalServerError;
    }
  }

  static async findOne(id: string) {
    return glyphData(id, this.findOneOrFail, this.findByIdOrFail);
  }

  static async create(params: PostGlyphParams) {
    try {
      await includeGlyphData(params.glyph, this.findOneOrFail);
    } catch (error) {
      throw new BadRequestError(`未実装のグリフお含んでいます。${error.message}`);
    }
    return GlyphModel.create(params.glyph);
  }

  static async update(id: string, params: PostGlyphParams) {
    // 名前を変更しようとしてゐるグリフを参照してゐるグリフが存在する場合の確認
    try {
      await includeGlyphData(params.glyph, this.findOneOrFail);
    } catch (error) {
      throw new BadRequestError(`未実装のグリフお含んでいます。${error.message}`);
    }
    const glyph = await GlyphModel.findByIdAndUpdate(Types.ObjectId(id), params, { new: true }).exec();
    if (!glyph) {
      throw new NotFoundError(`"${id}"のグリフわ見つかりませんでした。`);
    }
  }

  static async deleteOne(id: string) {
    // 消さうとしてゐるグリフを参照してゐる漢字、グリフが存在する場合の確認
    const glyph = await GlyphModel.findByIdAndDelete(Types.ObjectId(id)).exec();
    if (!glyph) {
      throw new NotFoundError(`"${id}"のグリフわ見つかりませんでした。`);
    }
  }

  private static async findOneOrFail(name: string) {
    const glyph: Glyph | null = await GlyphModel.findOne({ name: name }).exec();
    if (!glyph) {
      throw new NotFoundError(`"${name}"のグリフわ見つかりませんでした。`);
    }
    return this.toFindableGlyphData(glyph);
  }

  private static async findByIdOrFail(id: string) {
    const glyph: Glyph | null = await GlyphModel.findById(Types.ObjectId(id)).exec();
    if (!glyph) {
      throw new NotFoundError(`"${id}"のグリフわ見つかりませんでした。`);
    }
    return this.toFindableGlyphData(glyph);
  }

  private static toFindableGlyphData(glyph: Glyph) {
    return {
      id: glyph._id.toString(),
      name: glyph.name,
      data: glyph.data,
    };
  }
}
