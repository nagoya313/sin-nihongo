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
    order_by: z.enum(['stroke_count', 'read', 'code_point']).default('stroke_count'),
    stroke_count: zfd.numeric(intRange(MIN_STROKE_COUNT, MAX_STROKE_COUNT).optional()),
    read: zfd.text(hiragana.max(10).optional()),
  }),
);

export const radicalParams = withZod(z.object({ code_point: zfd.numeric(intRange(1, PG_SMALL_INT_MAX)) }));

export const radicalUpdateParams = withZod(
  z.object({
    stroke_count: zfd.numeric(intRange(1, PG_SMALL_INT_MAX)),
    reads: zfd.repeatable(z.array(zfd.text(hiragana.max(10))).min(1)),
  }),
);

export { MAX_STROKE_COUNT, MIN_STROKE_COUNT };
