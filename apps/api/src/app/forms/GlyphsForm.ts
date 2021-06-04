import { IsNotEmpty, IsOptional } from 'class-validator';

export class GlyphsQueryParams {
  @IsOptional()
  name: string;
}

export class GlyphsParams {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  data: string;
}
