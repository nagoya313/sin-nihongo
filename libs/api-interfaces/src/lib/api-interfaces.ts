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
  readonly ucs?: string;
  readonly readLike?: string;
  readonly numberOfStrokes?: number;
  readonly jisLevel?: number;
  readonly regular?: boolean;
  readonly forName?: boolean;
  readonly radicalId?: number;
}

export interface GetGlyphwikiRequest {
  readonly q: string;
}

export interface GetRadicalsRequest {
  readonly nameLike?: string;
  readonly numberOfStrokes?: number;
}

export interface GetGlyphsRequest {
  readonly nameLike?: string;
}

export interface PostGlyphRequestBody {
  readonly name: string;
  readonly data: string;
}

export interface PostGlyphRequest {
  readonly glyph: {
    readonly name: string;
    readonly data: string;
  };
}

export interface PaginationRequest {
  readonly page?: number;
  readonly limit?: number;
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

export interface WithIncludeGlyphsResponse<T> {
  readonly data: T;
  readonly includeGlyphs: Glyph[];
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

export interface Glyph {
  readonly id?: string;
  readonly name: string;
  readonly data: string;
}

export type GlyphResponse = WithIncludeGlyphsResponse<Glyph>;
export type GlyphsResponse = WithIncludeGlyphsResponse<PaginationResponse<Glyph>>;

export interface RadicalResponse {
  readonly id: number;
  readonly numberOfStrokes: number;
  readonly names: string[];
}

export type ApiMapping<Params, Response> = {
  readonly url: string;
  readonly method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  readonly lazy?: boolean;
  readonly auth?: boolean;
  readonly params?: Params;
  readonly response?: Response;
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
  } as ApiMapping<GetGlyphsRequest & PaginationRequest, GlyphsResponse>,
  postGlyph: {
    url: 'glyphs',
    method: 'POST',
    lazy: true,
    auth: true,
  } as ApiMapping<never, MessageResponse>,
  deleteGlyph: (id: string): ApiMapping<never, MessageResponse> => ({
    url: `glyphs/${id}`,
    method: 'DELETE',
    lazy: true,
    auth: true,
  }),
};
