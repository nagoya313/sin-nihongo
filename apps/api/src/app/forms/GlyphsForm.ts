import { IsNotEmpty, IsOptional } from 'class-validator';
import { GlyphForm } from '@sin-nihongo/api-interfaces';
import { PaginationQueryParams } from '../libs/pagination';

export class GlyphsQueryParams extends PaginationQueryParams {
  @IsOptional()
  nameLike: string;
}

export class GlyphsParams {
  @IsNotEmpty()
  glyph: GlyphForm;
}
