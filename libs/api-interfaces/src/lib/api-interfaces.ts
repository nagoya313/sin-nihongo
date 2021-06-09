import 'reflect-metadata';

export interface MessageResponse {
  readonly message: string;
}

export interface GetGlyphwikiRequest {
  q: string;
}

export interface GlyphwikiHealthResponse extends MessageResponse {
  readonly accessible: boolean;
}

export interface PaginationRequest {
  page?: number;
  limit?: number;
}

interface PaginationMetaData {
  readonly totalItems: number;
  readonly itemsPerPage: number;
  readonly itemCount: number;
  readonly totalPages: number;
  readonly currentPage: number;
}

export interface PaginationResponse<T> {
  readonly items: T[];
  readonly meta: PaginationMetaData;
}

export interface GlyphResponse {
  readonly id?: number;
  readonly name: string;
  readonly data: string;
  readonly includeGlyphs?: GlyphResponse[];
}
