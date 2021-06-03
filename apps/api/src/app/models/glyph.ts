import { model, Schema } from 'mongoose';

interface Glyph {
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

export const GlyphModel = model<Glyph>('Glyph', schema);
