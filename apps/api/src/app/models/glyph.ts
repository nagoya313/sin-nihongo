import { model, Document, Schema } from 'mongoose';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

export interface Glyph extends Document {
  name: string;
  data: string;
}

const schema = new Schema<Glyph>(
  {
    name: { type: String, required: true, unique: true },
    data: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosePagination);

export const GlyphModel: Pagination<Glyph> = model<Glyph, Pagination<Glyph>>('Glyph', schema);
