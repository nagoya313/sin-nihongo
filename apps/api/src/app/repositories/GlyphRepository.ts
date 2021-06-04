import { Types } from 'mongoose';
import { NotFoundError } from 'routing-controllers';
import { glyphData } from '../libs/glyph';
import { GlyphModel } from '../models/glyph';
import { Glyph } from '../../../../../libs/api-interfaces/src/lib/api-interfaces';

export class GlyphRepository {
  static async findOne(id: string) {
    return glyphData(id, this.findOneOrFail, this.ByIdOrFail);
  }

  private static async findOneOrFail(name) {
    const glyph: Glyph | null = await GlyphModel.findOne({ name: name }).exec();
    if (!glyph) {
      throw new NotFoundError(`"${name}"のグリフわ見つかりませんでした。`);
    }
    return glyph;
  }

  private static async ByIdOrFail(id) {
    const glyph: Glyph | null = await GlyphModel.findById(Types.ObjectId(id)).exec();
    if (!glyph) {
      throw new NotFoundError(`"${id}"のグリフわグリフウィキから見つかりませんでした。`);
    }
    return glyph;
  }
}
