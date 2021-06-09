import { Authorized, Body, JsonController, Delete, Get, Param, Patch, Post, QueryParams } from 'routing-controllers';
import { GetGlyphsParams, PostGlyphParams } from '@sin-nihongo/sin-nihongo-params';
import { PaginationQueryParams } from '../params/PaginationQueryParams';
import { GlyphResponse } from '../responses/GlyphResponse';
import { GlyphRepository } from '../repositories/GlyphRepository';

@JsonController()
export class GlyphsController {
  @Get('/glyphs')
  index(@QueryParams() searchParams: GetGlyphsParams, @QueryParams() pageParams: PaginationQueryParams) {
    return this.responser.toIndexResponse(GlyphRepository.findAndCount(searchParams, pageParams));
  }

  @Get('/glyphs/:id')
  show(@Param('id') id: string) {
    return GlyphRepository.findOne(id);
  }

  @Post('/glyphs')
  @Authorized()
  async create(@Body() params: PostGlyphParams) {
    await GlyphRepository.create(params);
    return { message: 'グリフデータを作成しました。' };
  }

  @Patch('/glyphs/:id')
  @Authorized()
  async update(@Param('id') id: string, @Body() params: PostGlyphParams) {
    await GlyphRepository.update(id, params);
    return { message: 'グリフデータを更新しました。' };
  }

  @Delete('/glyphs/:id')
  @Authorized()
  async destroy(@Param('id') id: string) {
    await GlyphRepository.deleteOne(id);
    return { message: 'グリフデータを削除しました。' };
  }

  private readonly responser = new GlyphResponse();
}
