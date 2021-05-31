export interface Error {
  name: string;
  stack: string;
  message: string;
}

interface PaginationMetaData {
  readonly totalItems: number;
  readonly itemsPerPage: number;
  readonly itemCount: number;
  readonly totalPages: number;
  readonly currentPage: number;
}

export interface Pagination<T> {
  readonly items: T[];
  readonly meta: PaginationMetaData;
}

export interface Radical {
  readonly id: number;
  readonly numberOfStrokes: number;
  readonly names: string[];
  readonly character: string;
}

export interface KageData {
  readonly name: string;
  readonly data: string;
}

export interface KageRecursionData {
  readonly name: string;
  readonly needGlyphs: KageData[];
}

export const GLYPHWIKI_QUERY_PARAMS_MATCHER = /^([\da-z-_@]+|.)$/;
