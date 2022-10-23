import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { booleanRadio } from '~/utils/schemas/booleanRadio';
import { direction } from '~/utils/schemas/direction';
import { intRange } from '~/utils/schemas/intRange';
import { jisLevelRadio } from '~/utils/schemas/jisLevelRadio';
import { kageData, kageName } from '~/utils/schemas/kageData';
import { hiragana, kana, katakana } from '~/utils/schemas/regex';
import { PG_INT_MAX, PG_SMALL_INT_MAX } from '~/utils/sql';
import { MAX_STROKE_COUNT, MIN_STROKE_COUNT } from './constants';

export const kanjiQueryParams = withZod(
  z.object({
    direction,
    order_by: z.enum(['stroke_count', 'read']).default('stroke_count'),
    kanji: zfd
      .text(z.union([z.string().length(1, '書式が不正です'), z.string().regex(/^u[\da-f]{4}$/)]).optional())
      .transform((kanji) =>
        kanji != null
          ? [...kanji].length === 1
            ? kanji.codePointAt(0)!
            : parseInt(kanji.match(/[\da-f]{4}/)![0]!, 16)
          : undefined,
      ),
    stroke_count: zfd.numeric(intRange(MIN_STROKE_COUNT, MAX_STROKE_COUNT).optional()),
    read: zfd.text(kana.max(10).optional()),
    regular: booleanRadio,
    for_name: booleanRadio,
    jis_level: jisLevelRadio,
    has_glyph: booleanRadio,
    radical: zfd.numeric(intRange(1, PG_SMALL_INT_MAX).optional()),
    offset: zfd.numeric(z.number().min(0).default(0)),
  }),
);

export const kanjiParams = withZod(z.object({ code_point: zfd.numeric(intRange(1, PG_INT_MAX)) }));

export const kanjiUpdateParams = withZod(
  z.object({
    stroke_count: zfd.numeric(intRange(1, PG_SMALL_INT_MAX)),
    in_radical_stroke_count: zfd.numeric(intRange(-1, PG_SMALL_INT_MAX)),
    on_reads: zfd.repeatable(z.array(zfd.text(katakana.max(10))).min(1)),
    kun_reads: zfd.repeatable(z.array(zfd.text(hiragana.max(10))).min(1)),
    regular: zfd.checkbox(),
    for_name: zfd.checkbox(),
    jis_level: z.union([zfd.numeric(z.literal(1)), zfd.numeric(z.literal(2))]),
    radical: zfd.numeric(intRange(1, PG_SMALL_INT_MAX)),
  }),
);

export const kanjiGlyphCreateParams = withZod(
  z.object({
    glyph_name: kageName,
    data: kageData,
    code_point: zfd.numeric(),
    form_id: zfd.text(),
  }),
);

export const kanjiGlyphUpdateParams = withZod(
  z.object({
    code_point: zfd.numeric(),
    form_id: zfd.text(),
    glyph_name: kageName,
    data: kageData,
    type: z.enum(['create', 'link']),
  }),
);

export const kanjiGlyphUnlinkParams = kanjiParams;

export { MAX_STROKE_COUNT, MIN_STROKE_COUNT };
