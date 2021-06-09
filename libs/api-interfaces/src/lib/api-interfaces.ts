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

export interface GetKanjisRequest {
  ucs?: string;
  readLike?: string;
  numberOfStrokes?: number;
  jisLevel?: number;
  regular?: boolean;
  forName?: boolean;
  radicalId?: number;
}

export interface GetGlyphwikiRequest {
  q: string;
}

export interface GetRadicalsRequest {
  nameLike?: string;
  numberOfStrokes?: number;
}

export interface GetGlyphsRequest {
  nameLike?: string;
}

export interface PostGlyphRequestBody {
  name: string;
  data: string;
}

export interface PostGlyphRequest {
  glyph: PostGlyphRequestBody;
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

export interface KanjiResponse {
  readonly id: number;
  readonly regular: boolean;
  readonly forName: boolean;
  readonly jisLevel: number;
  readonly numberOfStrokes: number;
  readonly numberOfStrokesInRadicals: number;
  readonly radicalId: number;
  readonly kunyomi: string[];
  readonly onyomi: string[];
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
  getKanjis: {
    url: 'kanjis',
    method: 'GET',
  } as ApiMapping<GetKanjisRequest & PaginationRequest, PaginationResponse<KanjiResponse>>,
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
  getGlyphs: {
    url: 'glyphs',
    method: 'GET',
  } as ApiMapping<GetGlyphsRequest & PaginationRequest, PaginationResponse<GlyphResponse>>,
  postGlyph: {
    url: 'glyphs',
    method: 'POST',
    lazy: true,
    auth: true,
  } as ApiMapping<never, MessageResponse>,
  deleteGlyph: (id: string) =>
    ({
      url: `glyphs/${id}`,
      method: 'DELETE',
      lazy: true,
      auth: true,
    } as ApiMapping<never, MessageResponse>),
};
