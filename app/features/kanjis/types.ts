import { type Timestamp } from '~/db/timestamp';

export type Kanji = Readonly<{
  code_point: number;
  regular: boolean;
  for_name: boolean;
  stroke_count: number;
  in_radical_stroke_count: number;
  radical_code_point: number;
  jis_level: 1 | 2;
  glyph_id: number | null;
}> &
  Timestamp;

export type KanjiRead = Readonly<{
  read: string;
  kanji_code_point: number;
}> &
  Timestamp;
