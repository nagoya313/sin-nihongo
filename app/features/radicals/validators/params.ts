import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { direction } from '~/utils/schemas/direction';
import { hiragana } from '~/utils/schemas/regex';

export const MIN_STOREKE_COUNT = 1;
export const MAX_STOREKE_COUNT = 17;

export const radicalQueryParams = withZod(
  z.object({
    direction,
    orderBy: z.enum(['stroke_count', 'read']).default('stroke_count'),
    strokeCount: zfd.numeric(
      z
        .number()
        .min(MIN_STOREKE_COUNT, `${MIN_STOREKE_COUNT}以上で入力してください`)
        .max(MAX_STOREKE_COUNT, `${MAX_STOREKE_COUNT}以下で入力してください`)
        .int()
        .optional(),
    ),
    read: zfd.text(hiragana.max(10, '10文字以内で入力してください').optional()),
  }),
);

export const radicalParams = withZod(
  z.object({
    codePoint: zfd.numeric(z.number().int()),
  }),
);
