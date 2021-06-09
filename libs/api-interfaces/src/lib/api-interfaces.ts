export const routePrefix = '/api/v1';

export interface MessageResponse {
  readonly message: string;
}

export interface ValidationError {
  readonly property: string;
  readonly value: string;
  readonly constraints: Record<string, string>;
}

export interface ApiError {
  readonly name: string;
  readonly message: string;
  readonly errors?: ValidationError;
}

export interface GetGlyphwikiRequest {
  q: string;
}

export interface GetRadicalsRequest {
  nameLike?: string;
  numberOfStrokes?: number;
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

export interface GlyphwikiHealthResponse extends MessageResponse {
  readonly accessible: boolean;
}

export interface GlyphResponse {
  readonly id?: number;
  readonly name: string;
  readonly data: string;
  readonly includeGlyphs?: GlyphResponse[];
}

export interface RadicalResponse {
  readonly id: number;
  readonly numberOfStrokes: number;
  readonly names: string[];
}

export type ApiMapping<Params, Response> = {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  lazy?: boolean;
  auth?: boolean;
  params: Params;
  response: Response;
};

export const apiRoutes = {
  getGlyphwiki: {
    url: 'glyphwiki',
    method: 'GET',
  } as ApiMapping<GetGlyphwikiRequest, GlyphResponse>,
  getGlyphwikiHealth: {
    url: 'glyphwiki/health',
    method: 'GET',
  } as ApiMapping<never, GlyphwikiHealthResponse>,
  getRadicals: {
    url: 'radicals',
    method: 'GET',
  } as ApiMapping<GetRadicalsRequest & PaginationRequest, PaginationResponse<RadicalResponse>>,
};
