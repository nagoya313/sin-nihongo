import { IsNotEmpty, IsOptional } from 'class-validator';
import { PaginationQueryParams } from '../libs/pagination';

export class GlyphsQueryParams extends PaginationQueryParams {
  @IsOptional()
  name: string;
}

export class GlyphsParams {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  data: string;
}
