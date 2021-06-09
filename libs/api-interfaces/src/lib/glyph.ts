import { IsOptional } from 'class-validator';
import { IsNotEmpty, Length } from './decorator';
import { PaginationParams } from './pagination';

export class GlyphsSearchParams extends PaginationParams {
  @IsOptional()
  nameLike: string;
}

export class GlyphForm {
  @Length(1, 20)
  name: string;

  @IsNotEmpty
  data: string;
}

export class GlyphParams {
  constructor(glyph: GlyphForm) {
    this.glyph = glyph;
  }

  @IsNotEmpty
  glyph: GlyphForm;
}

export interface GlyphResponse {
  readonly id?: string;
  readonly name: string;
  readonly data: string;
  readonly includeGlyphs?: GlyphResponse[];
}
