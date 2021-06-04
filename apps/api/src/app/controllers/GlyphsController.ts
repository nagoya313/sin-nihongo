import { JsonController, Delete, Get, Param, Patch, Post } from 'routing-controllers';
import { Types } from 'mongoose';
import { ValidateBody, ValidateQueryParams } from '../libs/decorators';
import { GlyphsParams, GlyphsQueryParams } from '../forms/GlyphsForm';
import { GlyphModel } from '../models/glyph';

@JsonController()
export class GlyphsController {
  @Get('/glyphs')
  async index(@ValidateQueryParams query: GlyphsQueryParams) {
    const glyphs = await GlyphModel.find({ name: { $regex: query.name, $options: 'i' } })
      .limit(20)
      .exec();
    return glyphs.map((glyph) => glyph.toObject());
  }

  @Post('/glyphs')
  async create(@ValidateBody params: GlyphsParams) {
    const glyph = await GlyphModel.create(params);
    return glyph.toObject();
  }

  @Patch('/glyphs/:id')
  async update(@Param('id') id: string, @ValidateBody params: GlyphsParams) {
    const glyph = await GlyphModel.findByIdAndUpdate(Types.ObjectId(id), params, { new: true }).exec();
    return glyph.toObject();
  }

  @Delete('/glyphs/:id')
  async destroy(@Param('id') id: string) {
    const glyph = await GlyphModel.findByIdAndDelete(Types.ObjectId(id)).exec();
    return glyph.toObject();
  }
}
