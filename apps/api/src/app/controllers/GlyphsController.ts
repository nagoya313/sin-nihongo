import { JsonController, Delete, Get, Param, Patch, Post } from 'routing-controllers';
import { Types } from 'mongoose';
import { ValidateBody, ValidateQueryParams } from '../libs/decorators';
import { GlyphsParams, GlyphsQueryParams } from '../forms/GlyphsForm';
import { GlyphModel } from '../models/glyph';
import { glyphsResponse } from '../responses/GlyphResponse';

@JsonController()
export class GlyphsController {
  @Get('/glyphs')
  async index(@ValidateQueryParams query: GlyphsQueryParams) {
    const glyphs = await GlyphModel.paginate({
      query: query.name && { name: { $regex: query.name, $options: 'i' } },
      sort: { name: 'asc' },
      limit: 20,
      page: query.page,
    });
    return glyphsResponse(glyphs);
  }

  @Get('/glyphs/:id')
  async show(@Param('id') id: string) {
    const glyph = await GlyphModel.findById(Types.ObjectId(id)).exec();
    return glyph.toObject();
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
