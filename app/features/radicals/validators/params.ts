import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { direction } from '~/utils/schemas/direction';
import { intRange } from '~/utils/schemas/intRange';
import { hiragana } from '~/utils/schemas/regex';

export const MIN_STOREKE_COUNT = 1;
export const MAX_STOREKE_COUNT = 17;

export const radicalQueryParams = withZod(
  z.object({
    direction,
    orderBy: z.enum(['stroke_count', 'read']).default('stroke_count'),
    strokeCount: zfd.numeric(intRange(MIN_STOREKE_COUNT, MAX_STOREKE_COUNT).optional()),
    read: zfd.text(hiragana.max(10, '10文字以内で入力してください').optional()),
  }),
);

export const radicalParams = withZod(
  z.object({
    codePoint: zfd.numeric(z.number().int()),
  }),
);

export const radicalUpdateParams = withZod(
  z.object({
    reads: zfd.repeatable(z.array(zfd.text(zfd.text(hiragana.max(10, '10文字以内で入力してください')))).min(1)),
  }),
);