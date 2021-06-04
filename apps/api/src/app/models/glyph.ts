import { model, Document, Schema } from 'mongoose';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

interface Glyph extends Document {
  name: string;
  data: string;
}

const schema = new Schema<Glyph>(
  {
    name: { type: String, require: true, unique: true },
    data: { type: String, require: true },
  },
  {
    timestamps: true,
    toObject: {
      versionKey: false,
      transform: (doc, ret) => {
        return { id: ret._id.toString(), name: ret.name, data: ret.data };
      },
    },
  }
);

schema.plugin(mongoosePagination);

export const GlyphModel: Pagination<Glyph> = model<Glyph, Pagination<Glyph>>('Glyph', schema);
