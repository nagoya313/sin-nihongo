import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { booleanRadio } from '~/utils/schemas/booleanRadio';
import { direction } from '~/utils/schemas/direction';
import { intRange } from '~/utils/schemas/intRange';
import { jisLevelRadio } from '~/utils/schemas/jisLevelRadio';
import { kageData, kageName } from '~/utils/schemas/kageData';
import { kana } from '~/utils/schemas/regex';
import { PG_INT_MAX, PG_SMALL_INT_MAX } from '~/utils/sql';
import { MAX_STROKE_COUNT, MIN_STROKE_COUNT } from './constants';

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
    strokeCount: zfd.numeric(intRange(MIN_STROKE_COUNT, MAX_STROKE_COUNT).optional()),
    read: zfd.text(kana.max(10).optional()),
    regular: booleanRadio,
    forName: booleanRadio,
    jisLevel: jisLevelRadio,
    hasGlyph: booleanRadio,
    radical: zfd.numeric(z.number().min(0).max(PG_SMALL_INT_MAX).optional()),
    offset: zfd.numeric(z.number().min(0).default(0)),
  }),
);

export const kanjiParams = withZod(z.object({ codePoint: zfd.numeric(z.number().int().positive().max(PG_INT_MAX)) }));

export const kanjiGlyphCreateParams = withZod(
  z.object({
    name: kageName,
    data: kageData,
    codePoint: zfd.numeric(),
    formId: zfd.text(),
  }),
);

export const kanjiGlyphUpdateParams = withZod(
  z.object({
    name: kageName,
    data: kageData,
    codePoint: zfd.numeric(),
    formId: zfd.text(),
  }),
);

export const kanjiGlyphUnlinkParams = withZod(z.object({ codePoint: zfd.numeric() }));

export { MAX_STROKE_COUNT, MIN_STROKE_COUNT };
