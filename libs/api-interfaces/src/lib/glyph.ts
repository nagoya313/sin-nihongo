import { IsNotEmpty, Length } from 'class-validator';
import { IsOptional } from './decorator';
import { PaginationQueryParams } from './pagination';

export class GlyphsQueryParams extends PaginationQueryParams {
  @IsOptional()
  nameLike: string;
}

export class GlyphForm {
  @Length(1, 20, { message: 'グリフ名わ$constraint1文字以上$constraint2文字以内で入力してください' })
  name: string;

  @IsNotEmpty({ message: 'KAGEデータお入力してください' })
  data: string;
}

export class GlyphParams {
  constructor(glyph: GlyphForm) {
    this.glyph = glyph;
  }

  @IsNotEmpty()
  glyph: GlyphForm;
}
