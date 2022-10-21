import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { booleanRadio } from '~/utils/schemas/booleanRadio';
import { direction } from '~/utils/schemas/direction';
import { intRange } from '~/utils/schemas/intRange';
import { jisLevelRadio } from '~/utils/schemas/jisLevelRadio';
import { kana } from '~/utils/schemas/regex';
import { PG_SMALL_INT_MAX } from '~/utils/sql';
import { MAX_STROKE_COUNT, MIN_STROKE_COUNT } from '../kanjis/constants';

export const readKanjiQueryParams = withZod(
  z.object({
    direction,
    stroke_count: zfd.numeric(intRange(MIN_STROKE_COUNT, MAX_STROKE_COUNT).optional()),
    read: zfd.text(kana.max(10).optional()),
    regular: booleanRadio,
    for_name: booleanRadio,
    jis_level: jisLevelRadio,
    radical: zfd.numeric(intRange(1, PG_SMALL_INT_MAX).optional()),
  }),
);

export { MAX_STROKE_COUNT, MIN_STROKE_COUNT };
