import { type Kanji, type KanjiRead } from '~/features/kanjis/types';
import { type Radical, type RadicalRead } from '~/features/radicals/types';

export type Database = {
  radical: Radical;
  radical_read: RadicalRead;
  kanji: Kanji;
  kanji_read: KanjiRead;
};
