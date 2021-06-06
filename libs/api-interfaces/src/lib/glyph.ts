import { IsNotEmpty, Length } from 'class-validator';
import { IsOptional } from './decorator';
import { PaginationQueryParams } from './pagination';

export class GlyphsQueryParams extends PaginationQueryParams {
  @IsOptional()
  nameLike: string;
}

export class GlyphForm {
  @Length(1, 20)
  name: string;

  @IsNotEmpty()
  data: string;
}

export class GlyphParams {
  constructor(glyph: GlyphForm) {
    this.glyph = glyph;
  }

  @IsNotEmpty()
  glyph: GlyphForm;
}
