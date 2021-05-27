export interface KageData {
  readonly name: string;
  readonly data: string;
}

export interface KageRecursionData {
  readonly name: string;
  readonly needGlyphs: KageData[];
}

export const GLYPHWIKI_QUERY_PARAMS_MATCHER = /^([\da-z-]+|.)$/;
