import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { direction } from '~/utils/schemas/direction';
import { intRange } from '~/utils/schemas/intRange';
import { hiragana } from '~/utils/schemas/regex';
import { PG_SMALL_INT_MAX } from '~/utils/sql';
import { MAX_STROKE_COUNT, MIN_STROKE_COUNT } from './constants';

export const radicalQueryParams = withZod(
  z.object({
    direction,
    orderBy: z.enum(['stroke_count', 'read', 'code_point']).default('stroke_count'),
    strokeCount: zfd.numeric(intRange(MIN_STROKE_COUNT, MAX_STROKE_COUNT).optional()),
    read: zfd.text(hiragana.max(10).optional()),
  }),
);

export const radicalParams = withZod(
  z.object({ codePoint: zfd.numeric(z.number().int().positive().max(PG_SMALL_INT_MAX)) }),
);

export const radicalUpdateParams = withZod(
  z.object({
    reads: zfd.repeatable(z.array(zfd.text(zfd.text(hiragana.max(10)))).min(1)),
  }),
);

export { MAX_STROKE_COUNT, MIN_STROKE_COUNT };
