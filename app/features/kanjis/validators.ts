import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { booleanRadio } from '~/utils/schemas/booleanRadio';
import { direction } from '~/utils/schemas/direction';
import { intRange } from '~/utils/schemas/intRange';
import { kana } from '~/utils/schemas/regex';
import { MAX_STOROKE_COUNT, MIN_STOROKE_COUNT } from './constants';

const PG_INT_MAX = 2147483647;

export const kanjiQueryParams = withZod(
  z.object({
    direction,
    orderBy: z.enum(['stroke_count', 'read']).default('stroke_count'),
    kanji: zfd
      .text(z.union([z.string().length(1, '書式が不正です'), z.string().regex(/^u[\da-f]{4}$/)]).optional())
      .transform((kanji) =>
        kanji != null
          ? [...kanji].length === 1
            ? kanji.codePointAt(0)!
            : parseInt(kanji.match(/[\da-f]{4}/)![0]!, 16)
          : undefined,
      ),
    strokeCount: zfd.numeric(intRange(MIN_STOROKE_COUNT, MAX_STOROKE_COUNT).optional()),
    read: zfd.text(kana.max(10).optional()),
    regular: booleanRadio,
    forName: booleanRadio,
    jisLevel: zfd.numeric(
      z
        .union([z.literal('none'), z.literal(1), z.literal(2)])
        .default('none')
        .transform((level) => (level === 'none' ? undefined : level)),
    ),
    hasGlyph: booleanRadio,
    radical: zfd.numeric(z.number().min(0).optional()),
    offset: zfd.numeric(z.number().min(0).default(0)),
  }),
);

export const kanjiParams = withZod(z.object({ codePoint: zfd.numeric(z.number().int().positive().max(PG_INT_MAX)) }));

export const kanjiGlyphCreateParams = withZod(
  z.object({
    name: zfd.text(z.string().max(50)),
    data: zfd.text(),
    codePoint: zfd.numeric(),
    formId: zfd.text(),
  }),
);

export const kanjiGlyphUpdateParams = withZod(
  z.object({
    name: zfd.text(z.string().max(50)),
    data: zfd.text(),
    codePoint: zfd.numeric(),
    formId: zfd.text(),
  }),
);

export const kanjiGlyphUnlinkParams = withZod(z.object({ codePoint: zfd.numeric() }));

export { MAX_STOROKE_COUNT, MIN_STOROKE_COUNT };
