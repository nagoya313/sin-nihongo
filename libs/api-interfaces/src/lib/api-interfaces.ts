export interface ValidationError {
  readonly property: string;
  readonly value: string;
  readonly constraints: { [key: string]: string };
}

export interface Error {
  readonly name: string;
  readonly message: string | ValidationError;
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

export interface Kanji {
  readonly id: number;
  readonly ucs: string;
  readonly regular: boolean;
  readonly forName: boolean;
  readonly jisLevel: number;
  readonly numberOfStrokes: number;
  readonly numberOfStrokesInRadicals: number;
  readonly radical: {
    readonly id: number;
    readonly character: string;
  };
  readonly kunyomis: string[];
  readonly onyomis: string[];
  readonly character: string;
}

export interface Glyph {
  readonly id: string;
  readonly name: string;
  readonly data: string;
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
export const KANJI_USC_QUERY_PARAMS_MATCHER = /^((u[\da-f]{4})|[\u4E00-\u9FFF])$/;
export const RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER = /^(?!.*[ぢづゐゑを])[\u3040-\u3093ー]*$/;
