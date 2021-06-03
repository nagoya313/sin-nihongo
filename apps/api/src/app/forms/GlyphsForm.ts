import { IsNotEmpty } from 'class-validator';
export class GlyphsQueryParams {}

export class GlyphsParams {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  data: string;
}
