import 'reflect-metadata';

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
  readonly id?: string;
  readonly name: string;
  readonly data: string;
  readonly includeGlyphs?: Glyph[];
}

/*export interface Glyphs extends Pagination<Glyph> {
  readonly includeGlyphs: Glyph[];
}*/

export * from './error';
export * from './kanji';
export * from './glyph';
export * from './glyphwiki';
export * from './message';
export * from './pagination';
export * from './radical';
