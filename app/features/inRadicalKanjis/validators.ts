import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { booleanRadio } from '~/utils/schemas/booleanRadio';
import { direction } from '~/utils/schemas/direction';
import { intRange } from '~/utils/schemas/intRange';
import { jisLevelRadio } from '~/utils/schemas/jisLevelRadio';
import { kana } from '~/utils/schemas/regex';
import { MAX_IN_RADICAL_STROKE_COUNT, MIN_IN_RADICAL_STROKE_COUNT } from './constants';

export const inRadicalKanjiQueryParams = withZod(
  z.object({
    direction,
    order_by: z.enum(['stroke_count', 'read']).default('stroke_count'),
    in_radical_stroke_count: zfd.numeric(intRange(MIN_IN_RADICAL_STROKE_COUNT, MAX_IN_RADICAL_STROKE_COUNT).optional()),
    read: zfd.text(kana.max(10).optional()),
    regular: booleanRadio,
    for_name: booleanRadio,
    jis_level: jisLevelRadio,
  }),
);

export { MAX_IN_RADICAL_STROKE_COUNT, MIN_IN_RADICAL_STROKE_COUNT };
