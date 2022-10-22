import { HIRAGANA_MATCHER, KATAKANA_MATCHER } from '~/utils/schemas/regex';

export const toOnyomi = (reads: ReadonlyArray<string>) => reads.filter((read) => read.match(KATAKANA_MATCHER));
export const toKunyomi = (reads: ReadonlyArray<string>) => reads.filter((read) => read.match(HIRAGANA_MATCHER));
