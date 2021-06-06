import { IsOptional, IsNotEmpty, Length } from 'class-validator';
import { PaginationQueryParams } from './pagination';

export class GlyphsQueryParams extends PaginationQueryParams {
  @IsOptional()
  nameLike: string;
}

export class GlyphForm {
  @Length(1, 20)
  readonly name: string;

  @IsNotEmpty()
  readonly data: string;
}

export class GlyphParams {
  constructor(glyph: GlyphForm) {
    this.glyph = glyph;
  }

  @IsNotEmpty()
  readonly glyph: GlyphForm;
}
