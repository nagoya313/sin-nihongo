import { Types } from 'mongoose';
import { glyphData } from '../libs/glyph';
import { GlyphModel } from '../models/glyph';

export class GlyphRepository {
  static async findOne(id: string) {
    return glyphData(
      id,
      (name) => GlyphModel.findOne({ name: name }).exec(),
      () => GlyphModel.findById(Types.ObjectId(id)).exec()
    );
  }
}
