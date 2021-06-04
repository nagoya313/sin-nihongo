import { Authorized, JsonController, Delete, Get, Param, Patch, Post } from 'routing-controllers';
import { Types } from 'mongoose';
import { ValidateBody, ValidateQueryParams } from '../libs/decorators';
import { GlyphsParams, GlyphsQueryParams } from '../forms/GlyphsForm';
import { GlyphModel } from '../models/glyph';
import { GlyphResponse } from '../responses/GlyphResponse';
import { GlyphRepository } from '../repositories/GlyphRepository';

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
    return this.responser.toIndexResponse(glyphs);
  }

  @Get('/glyphs/:id')
  async show(@Param('id') id: string) {
    return await GlyphRepository.findOne(id);
  }

  @Post('/glyphs')
  @Authorized()
  async create(@ValidateBody params: GlyphsParams) {
    await GlyphModel.create(params);
    return { message: 'グリフデータを作成しました。' };
  }

  @Patch('/glyphs/:id')
  @Authorized()
  async update(@Param('id') id: string, @ValidateBody params: GlyphsParams) {
    await GlyphModel.findByIdAndUpdate(Types.ObjectId(id), params, { new: true }).exec();
    return { message: 'グリフデータを更新しました。' };
  }

  @Delete('/glyphs/:id')
  @Authorized()
  async destroy(@Param('id') id: string) {
    await GlyphModel.findByIdAndDelete(Types.ObjectId(id)).exec();
    return { message: 'グリフデータを削除しました。' };
  }

  private readonly responser = new GlyphResponse();
}
