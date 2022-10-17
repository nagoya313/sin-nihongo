import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { booleanRadio } from '~/utils/schemas/booleanRadio';
import { direction } from '~/utils/schemas/direction';
import { intRange } from '~/utils/schemas/intRange';
import { kana } from '~/utils/schemas/regex';

export const MIN_STOREKE_COUNT = 1;
export const MAX_STOREKE_COUNT = 30;
export const MIN_IN_RADICAL_STOREKE_COUNT = -1;
export const MAX_IN_RADICAL_STOREKE_COUNT = 25;
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
    strokeCount: zfd.numeric(intRange(MIN_STOREKE_COUNT, MAX_STOREKE_COUNT).optional()),
    read: zfd.text(kana.max(10).optional()),
    regular: booleanRadio,
    forName: booleanRadio,
    jisLevel: zfd.numeric(
      z
        .union([z.literal('none'), z.literal(1), z.literal(2)])
        .default('none')
        .transform((level) => (level === 'none' ? undefined : level)),
    ),
    offset: zfd.numeric(z.number().min(0).default(0)),
  }),
);

export const radicalKanjiQueryParams = withZod(
  z.object({
    direction,
    orderBy: z.enum(['stroke_count', 'read']).default('stroke_count'),
    strokeCount: zfd.numeric(intRange(MIN_IN_RADICAL_STOREKE_COUNT, MAX_IN_RADICAL_STOREKE_COUNT).optional()),
    read: zfd.text(kana.max(10).optional()),
    regular: booleanRadio,
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
