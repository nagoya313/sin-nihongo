import 'reflect-metadata';
import { Pagination } from './pagination';

export interface Message {
  readonly message: string;
}

export interface ValidationError {
  readonly property: string;
  readonly value: string;
  readonly constraints: { [key: string]: string };
}

export interface ApiError {
  readonly name: string;
  readonly message: string;
  readonly errors?: ValidationError;
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
  readonly id?: string;
  readonly name: string;
  readonly data: string;
  readonly includeGlyphs?: Glyph[];
}

export interface Glyphs extends Pagination<Glyph> {
  readonly includeGlyphs: Glyph[];
}

export * from './kanji';
export * from './glyph';
export * from './glyphwiki';
export * from './radical';
export * from './pagination';
